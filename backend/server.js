import { appendFileSync } from 'node:fs'
import { randomBytes } from 'node:crypto'
import express from 'express'
import pg from 'pg'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import multer from 'multer'
import { sniffImage } from './image.js'

// Connection settings come from the standard PG* env vars (PGHOST, PGPORT, PGUSER, PGPASSWORD), see .env.example
const DB_NAME = process.env.PGDATABASE || 'snarp'
const PORT = process.env.PORT || 5000

// First run: generate a JWT secret and save it so logins survive restarts
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = randomBytes(48).toString('hex')
  appendFileSync(new URL('.env', import.meta.url), `\nJWT_SECRET=${process.env.JWT_SECRET}\n`)
  console.log('Generated JWT_SECRET in backend/.env')
}
const JWT_SECRET = process.env.JWT_SECRET

// Creates the database and tables on first run; no-op when they already exist
async function setupDb() {
  const admin = new pg.Client({ database: 'postgres' })
  await admin.connect()
  const { rowCount } = await admin.query('SELECT 1 FROM pg_database WHERE datname = $1', [DB_NAME])
  if (!rowCount) {
    await admin.query(`CREATE DATABASE "${DB_NAME.replaceAll('"', '""')}"`)
    console.log(`Created database ${DB_NAME}`)
  }
  await admin.end()

  const pool = new pg.Pool({ database: DB_NAME })
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id            SERIAL PRIMARY KEY,
      name          VARCHAR(100) NOT NULL,
      email         VARCHAR(255) NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role          VARCHAR(20) NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'moderator', 'author', 'user')),
      created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    -- Post images live in Postgres as BYTEA
    CREATE TABLE IF NOT EXISTS images (
      id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      mime       VARCHAR(20) NOT NULL,
      data       BYTEA NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    CREATE TABLE IF NOT EXISTS posts (
      id         SERIAL PRIMARY KEY,
      user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      body       TEXT NOT NULL DEFAULT '',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    CREATE INDEX IF NOT EXISTS posts_created_at_idx ON posts (created_at DESC);
    -- Upgrades posts tables created before image support
    ALTER TABLE posts ADD COLUMN IF NOT EXISTS image_id UUID REFERENCES images(id) ON DELETE SET NULL;
    ALTER TABLE posts DROP CONSTRAINT IF EXISTS posts_body_check;
    DO $$ BEGIN
      ALTER TABLE posts ADD CONSTRAINT posts_content_check
        CHECK (length(body) <= 5000 AND (length(trim(body)) > 0 OR image_id IS NOT NULL));
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;`)
  return pool
}

const pool = await setupDb().catch((err) => {
  console.error(`Could not set up PostgreSQL: ${err.message}\nCheck PGHOST/PGPORT/PGUSER/PGPASSWORD in backend/.env`)
  process.exit(1)
})

const app = express()
app.use(express.json({ limit: '100kb' }))

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024, files: 1 } })

const publicUser = ({ id, name, email, role, created_at }) => ({ id, name, email, role, created_at })
const issue = (user) => ({ token: jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: '7d' }), user: publicUser(user) })

function auth(req, res, next) {
  const token = req.headers.authorization?.replace(/^Bearer /, '')
  try {
    req.userId = jwt.verify(token, JWT_SECRET).sub
    next()
  } catch {
    res.status(401).json({ error: 'Please log in again' })
  }
}

app.post('/api/auth/signup', async (req, res) => {
  const name = String(req.body?.name ?? '').trim()
  const email = String(req.body?.email ?? '').trim().toLowerCase()
  const password = String(req.body?.password ?? '')
  // Admin/Moderator are assigned by an admin, never self-selected
  const role = req.body?.role === 'author' ? 'author' : 'user'
  if (!name || name.length > 100) return res.status(400).json({ error: 'Enter your full name' })
  if (!/^\S+@\S+\.\S+$/.test(email) || email.length > 255) return res.status(400).json({ error: 'Enter a valid email address' })
  if (password.length < 8 || password.length > 72) return res.status(400).json({ error: 'Password must be 8-72 characters' })

  const hash = await bcrypt.hash(password, 10)
  try {
    const { rows } = await pool.query(
      'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, hash, role]
    )
    res.status(201).json(issue(rows[0]))
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ error: 'An account with this email already exists' })
    throw err
  }
})

// ponytail: no login rate limit yet, add express-rate-limit before deploying publicly
app.post('/api/auth/login', async (req, res) => {
  const email = String(req.body?.email ?? '').trim().toLowerCase()
  const password = String(req.body?.password ?? '')
  const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email])
  if (!rows[0] || !(await bcrypt.compare(password, rows[0].password_hash))) {
    return res.status(401).json({ error: 'Incorrect email or password' })
  }
  res.json(issue(rows[0]))
})

app.get('/api/auth/me', auth, async (req, res) => {
  const { rows } = await pool.query(
    'SELECT u.*, (SELECT count(*)::int FROM posts WHERE user_id = u.id) AS post_count FROM users u WHERE id = $1',
    [req.userId]
  )
  if (!rows[0]) return res.status(401).json({ error: 'Please log in again' })
  res.json({ ...publicUser(rows[0]), post_count: rows[0].post_count })
})

const POST_SELECT = `
  SELECT p.id, p.body, p.image_id, p.created_at, p.user_id, u.name AS author_name, u.role AS author_role
  FROM posts p JOIN users u ON u.id = p.user_id`

// ponytail: latest 50 only, add ?before=<id> pagination when the feed outgrows it
app.get('/api/posts', auth, async (req, res) => {
  const { rows } = await pool.query(`${POST_SELECT} ORDER BY p.created_at DESC LIMIT 50`)
  res.json(rows)
})

// Multipart: "body" text plus an optional "image" file
app.post('/api/posts', auth, upload.single('image'), async (req, res) => {
  const body = String(req.body?.body ?? '').trim()
  const mime = req.file && sniffImage(req.file.buffer)
  if (req.file && !mime) return res.status(400).json({ error: 'Image must be a JPEG, PNG, GIF or WebP file' })
  if (!body && !req.file) return res.status(400).json({ error: 'Write something or add an image' })
  if (body.length > 5000) return res.status(400).json({ error: 'Post must be under 5000 characters' })

  // One statement, so the image and post are saved together or not at all
  const { rows } = await pool.query(
    `WITH img AS (INSERT INTO images (user_id, mime, data) SELECT $1, $3, $4 WHERE $4::bytea IS NOT NULL RETURNING id)
     INSERT INTO posts (user_id, body, image_id) VALUES ($1, $2, (SELECT id FROM img)) RETURNING id`,
    [req.userId, body, mime ?? null, req.file?.buffer ?? null]
  )
  const created = await pool.query(`${POST_SELECT} WHERE p.id = $1`, [rows[0].id])
  res.status(201).json(created.rows[0])
})

app.delete('/api/posts/:id', auth, async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) return res.status(404).json({ error: 'Post not found' })
  const { rows } = await pool.query(
    `WITH d AS (DELETE FROM posts WHERE id = $1 AND user_id = $2 RETURNING image_id),
     di AS (DELETE FROM images WHERE id IN (SELECT image_id FROM d))
     SELECT count(*)::int AS n FROM d`,
    [id, req.userId]
  )
  if (!rows[0].n) return res.status(404).json({ error: 'Post not found' })
  res.status(204).end()
})

// Public by unguessable UUID so <img> tags work without auth headers
app.get('/api/images/:id', async (req, res) => {
  if (!/^[0-9a-f-]{36}$/i.test(req.params.id)) return res.status(404).end()
  const { rows } = await pool.query('SELECT mime, data FROM images WHERE id = $1', [req.params.id])
  if (!rows[0]) return res.status(404).end()
  res.set({ 'Content-Type': rows[0].mime, 'Cache-Control': 'public, max-age=31536000, immutable', 'X-Content-Type-Options': 'nosniff' })
  res.send(rows[0].data)
})

// Express only treats 4-arg middleware as an error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.code === 'LIMIT_FILE_SIZE' ? 'Image must be 5 MB or smaller' : err.message })
  }
  console.error(err)
  res.status(err.status || 500).json({ error: err.status ? err.message : 'Server error' })
})

app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`))
