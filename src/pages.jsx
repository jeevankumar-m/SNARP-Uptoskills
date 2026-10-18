// UI-only pages: they run on sample data from sample.js and save nothing yet
import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  Users, MapPin, Clock, FilePdf, Quotes, Copy, Check, PaperPlaneRight, UploadSimple,
  Heart, ChatCircle, UsersThree, CalendarBlank, SealCheck, CaretDown,
} from '@phosphor-icons/react'
import { Avatar, PageHeader } from './ui'
import { apa, bibtex } from './cite'
import { COMMUNITIES, ARTICLES, EVENTS, CONVERSATIONS, NOTIFICATIONS, MOD_QUEUE, FAQ } from './sample'

function CopyButton({ text }) {
  const [done, setDone] = useState(false)
  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setDone(true)
    setTimeout(() => setDone(false), 1500)
  }
  return (
    <button type="button" className="btn btn-ghost btn-sm" onClick={copy}>
      {done ? <Check size={16} /> : <Copy size={16} />} {done ? 'Copied' : 'Copy'}
    </button>
  )
}

function CommunityCard({ c }) {
  const [joined, setJoined] = useState(false)
  return (
    <article className="panel community">
      <div className={`community-band band-${c.color}`} />
      <span className={`tile tile-lg tile-${c.color}`}>{c.name[0]}</span>
      <h3>{c.name}</h3>
      <p className="muted-sm"><Users size={14} /> {c.members + (joined ? 1 : 0)} members</p>
      <p className="community-tagline">{c.tagline}</p>
      <button className={`btn btn-block ${joined ? 'btn-ghost' : 'btn-secondary'}`} onClick={() => setJoined(!joined)}>
        {joined ? 'Joined' : 'Join community'}
      </button>
    </article>
  )
}

export function Communities() {
  return (
    <div className="page">
      <PageHeader title="Communities" sub="Find people working on the same problems as you." />
      <div className="card-grid">
        {COMMUNITIES.map((c) => <CommunityCard key={c.id} c={c} />)}
      </div>
    </div>
  )
}

function ArticleCard({ a }) {
  const [cite, setCite] = useState(null) // 'apa' | 'bibtex'
  const text = cite === 'apa' ? apa(a) : cite === 'bibtex' ? bibtex(a) : ''
  return (
    <article className="panel article">
      <div className="article-meta">
        <span className="tag tag-blue">{a.domain}</span>
        <span className="muted-sm">{a.year}{a.journal && `, ${a.journal}`}</span>
      </div>
      <h3>{a.title}</h3>
      <p className="article-authors">{a.authors.join(', ')}</p>
      <p className="article-abstract">{a.abstract}</p>
      <div className="tag-row">
        {a.tags.map((t) => <span key={t} className="tag">#{t}</span>)}
      </div>
      <div className="article-actions">
        <button className="btn btn-secondary btn-sm"><FilePdf size={16} /> Read PDF</button>
        <button className="btn btn-ghost btn-sm" onClick={() => setCite(cite === 'apa' ? null : 'apa')}><Quotes size={16} /> APA</button>
        <button className="btn btn-ghost btn-sm" onClick={() => setCite(cite === 'bibtex' ? null : 'bibtex')}>BibTeX</button>
      </div>
      {cite && (
        <div className="cite-box">
          <pre>{text}</pre>
          <CopyButton text={text} />
        </div>
      )}
    </article>
  )
}

export function Articles() {
  const [domain, setDomain] = useState('All')
  const domains = ['All', ...new Set(ARTICLES.map((a) => a.domain))]
  const shown = ARTICLES.filter((a) => domain === 'All' || a.domain === domain)
  return (
    <div className="page">
      <PageHeader title="Research papers" sub="Peer-reviewed work approved by our moderators." />
      <div className="chips">
        {domains.map((d) => (
          <button key={d} className={`chip ${d === domain ? 'active' : ''}`} onClick={() => setDomain(d)}>{d}</button>
        ))}
      </div>
      <div className="stack">
        {shown.map((a) => <ArticleCard key={a.id} a={a} />)}
      </div>
    </div>
  )
}

function EventCard({ e }) {
  const [going, setGoing] = useState(false)
  return (
    <article className="panel event">
      <div className="event-date">
        <b>{e.day}</b>
        <span>{e.month}</span>
      </div>
      <div className="event-body">
        <span className="tag tag-orange">{e.kind}</span>
        <h3>{e.title}</h3>
        <p className="muted-sm">
          <Clock size={14} /> {e.time} <MapPin size={14} /> {e.place} <Users size={14} /> {e.going + (going ? 1 : 0)} going
        </p>
      </div>
      <button className={`btn ${going ? 'btn-ghost' : 'btn-primary'}`} onClick={() => setGoing(!going)}>
        {going ? 'Registered' : 'Register'}
      </button>
    </article>
  )
}

export function Events() {
  return (
    <div className="page">
      <PageHeader title="Events" sub="Webinars, workshops and hackathons for students and researchers." />
      <div className="stack">
        {EVENTS.map((e) => <EventCard key={e.id} e={e} />)}
      </div>
    </div>
  )
}

export function Messages() {
  const [convos, setConvos] = useState(CONVERSATIONS)
  const [activeId, setActiveId] = useState(CONVERSATIONS[0].id)
  const [draft, setDraft] = useState('')
  const active = convos.find((c) => c.id === activeId)

  const open = (id) => {
    setActiveId(id)
    setConvos((cs) => cs.map((c) => (c.id === id ? { ...c, unread: 0 } : c)))
  }

  const send = (e) => {
    e.preventDefault()
    if (!draft.trim()) return
    const msg = { mine: true, text: draft.trim(), time: 'Now' }
    setConvos((cs) => cs.map((c) => (c.id === activeId ? { ...c, messages: [...c.messages, msg] } : c)))
    setDraft('')
  }

  return (
    <div className="page page-wide">
      <PageHeader title="Messages" />
      <div className="panel inbox">
        <ul className="inbox-list">
          {convos.map((c) => (
            <li key={c.id}>
              <button className={`inbox-item ${c.id === activeId ? 'active' : ''}`} onClick={() => open(c.id)}>
                <Avatar name={c.name} />
                <span className="inbox-text">
                  <strong>{c.name}</strong>
                  <small>{c.messages.at(-1).text}</small>
                </span>
                {c.unread > 0 && <span className="nav-badge">{c.unread}</span>}
              </button>
            </li>
          ))}
        </ul>
        <section className="thread">
          <header className="thread-head">
            <Avatar name={active.name} size="sm" />
            <strong>{active.name}</strong>
          </header>
          <div className="thread-body">
            {active.messages.map((m, i) => (
              <div key={i} className={`bubble ${m.mine ? 'mine' : ''}`}>
                <p>{m.text}</p>
                <time>{m.time}</time>
              </div>
            ))}
          </div>
          <form className="thread-input" onSubmit={send}>
            <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder={`Message ${active.name}`} aria-label="Message" />
            <button className="btn btn-primary" disabled={!draft.trim()} aria-label="Send"><PaperPlaneRight size={18} /></button>
          </form>
        </section>
      </div>
    </div>
  )
}

const NOTIF_ICON = { review: SealCheck, like: Heart, community: UsersThree, event: CalendarBlank, comment: ChatCircle }

export function Notifications() {
  const [items, setItems] = useState(NOTIFICATIONS)
  return (
    <div className="page">
      <PageHeader title="Notifications">
        <button className="btn btn-ghost btn-sm" onClick={() => setItems(items.map((n) => ({ ...n, unread: false })))}>
          Mark all as read
        </button>
      </PageHeader>
      <ul className="panel notif-list">
        {items.map((n) => {
          const Icon = NOTIF_ICON[n.kind]
          return (
            <li key={n.id} className={`notif ${n.unread ? 'unread' : ''}`}>
              <span className={`notif-icon notif-${n.kind}`}><Icon size={18} weight="fill" /></span>
              <p>{n.text}</p>
              <time>{n.time}</time>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const EMPTY_CITE = { authors: '', year: '', title: '', journal: '', volume: '', issue: '', pages: '', doi: '' }

export function Tools() {
  const [m, setM] = useState(EMPTY_CITE)
  const set = (e) => setM({ ...m, [e.target.name]: e.target.value })
  const filled = Object.values(m).some(Boolean)
  const field = (name, label, props = {}) => (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} value={m[name]} onChange={set} {...props} />
    </div>
  )
  return (
    <div className="page">
      <PageHeader title="Citation tools" sub="Build APA and BibTeX citations. Fields you leave empty are left out." />
      <div className="panel form-panel">
        {field('authors', 'Authors', { placeholder: 'Iyer, R.; Nair, S.' })}
        {field('title', 'Title')}
        <div className="form-row">
          {field('journal', 'Journal or venue')}
          {field('year', 'Year', { inputMode: 'numeric' })}
        </div>
        <div className="form-row form-row-3">
          {field('volume', 'Volume')}
          {field('issue', 'Issue')}
          {field('pages', 'Pages', { placeholder: '45-61' })}
        </div>
        {field('doi', 'DOI', { placeholder: '10.1000/xyz123' })}
      </div>
      {filled && (
        <div className="stack">
          {[['APA', apa(m)], ['BibTeX', bibtex(m)]].map(([label, text]) => (
            <div key={label} className="panel cite-out">
              <div className="rail-head">
                <h3>{label}</h3>
                <CopyButton text={text} />
              </div>
              <pre>{text}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function Submit() {
  const [file, setFile] = useState(null)
  const [sent, setSent] = useState(false)
  return (
    <div className="page">
      <PageHeader title="Submit a paper" sub="Moderators review every submission before it is published." />
      {sent && <p className="notice">Paper submission is coming soon. Your form was not sent.</p>}
      <form className="panel form-panel" onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
        <div className="field">
          <label htmlFor="p-title">Title</label>
          <input id="p-title" required />
        </div>
        <div className="field">
          <label htmlFor="p-abstract">Abstract</label>
          <textarea id="p-abstract" rows={5} required />
        </div>
        <div className="form-row">
          <div className="field">
            <label htmlFor="p-doi">DOI (optional)</label>
            <input id="p-doi" placeholder="10.1000/xyz123" />
          </div>
          <div className="field">
            <label htmlFor="p-domain">Domain</label>
            <input id="p-domain" placeholder="AI, Education, UI/UX" />
          </div>
        </div>
        <div className="field">
          <label htmlFor="p-coauthors">Co-authors</label>
          <input id="p-coauthors" placeholder="Separate names with commas" />
        </div>
        <div className="field">
          <label htmlFor="p-tags">Tags</label>
          <input id="p-tags" placeholder="nlp, transformers" />
        </div>
        <label className="dropzone">
          <input type="file" accept="application/pdf" hidden onChange={(e) => setFile(e.target.files[0])} />
          <UploadSimple size={28} />
          <strong>{file ? file.name : 'Upload your paper'}</strong>
          <span>PDF only, up to 10 MB</span>
        </label>
        <button className="btn btn-primary">Submit for review</button>
      </form>
    </div>
  )
}

export function Moderation() {
  const [queue, setQueue] = useState(MOD_QUEUE.map((p) => ({ ...p, status: 'pending' })))
  const decide = (id, status) => setQueue((q) => q.map((p) => (p.id === id ? { ...p, status } : p)))
  const pending = queue.filter((p) => p.status === 'pending').length
  return (
    <div className="page">
      <PageHeader title="Moderation queue" sub={`${pending} submission${pending === 1 ? '' : 's'} waiting for review.`} />
      <div className="stack">
        {queue.map((p) => (
          <article key={p.id} className="panel mod-item">
            <div className="mod-info">
              <h3>{p.title}</h3>
              <p className="muted-sm">{p.author}, {p.domain}, {p.pages} pages, submitted {p.submitted}</p>
            </div>
            {p.status === 'pending' ? (
              <div className="mod-actions">
                <button className="btn btn-ghost btn-sm"><FilePdf size={16} /> Preview</button>
                <button className="btn btn-ghost btn-sm btn-danger" onClick={() => decide(p.id, 'rejected')}>Reject</button>
                <button className="btn btn-secondary btn-sm" onClick={() => decide(p.id, 'approved')}>Approve</button>
              </div>
            ) : (
              <span className={`tag ${p.status === 'approved' ? 'tag-teal' : 'tag-orange'}`}>
                {p.status === 'approved' ? 'Approved' : 'Rejected'}
              </span>
            )}
          </article>
        ))}
      </div>
    </div>
  )
}

function Toggle({ label, defaultOn }) {
  const [on, setOn] = useState(defaultOn)
  return (
    <label className="toggle-row">
      <span>{label}</span>
      <button type="button" role="switch" aria-checked={on} className={`switch ${on ? 'on' : ''}`} onClick={() => setOn(!on)} />
    </label>
  )
}

export function Settings({ user }) {
  const [saved, setSaved] = useState(false)
  return (
    <div className="page">
      <PageHeader title="Settings" sub="Manage your profile and notification preferences." />
      {saved && <p className="notice">Saving settings is coming soon. Nothing was changed.</p>}
      <form className="panel form-panel" onSubmit={(e) => { e.preventDefault(); setSaved(true) }}>
        <h3 className="form-title">Profile</h3>
        <div className="settings-avatar">
          <Avatar name={user.name} size="lg" />
          <button type="button" className="btn btn-ghost btn-sm">Change photo</button>
        </div>
        <div className="form-row">
          <div className="field">
            <label htmlFor="s-name">Full name</label>
            <input id="s-name" defaultValue={user.name} />
          </div>
          <div className="field">
            <label htmlFor="s-email">Email</label>
            <input id="s-email" defaultValue={user.email} disabled />
          </div>
        </div>
        <div className="field">
          <label htmlFor="s-aff">Affiliation</label>
          <input id="s-aff" placeholder="University or organisation" />
        </div>
        <div className="field">
          <label htmlFor="s-bio">Bio</label>
          <textarea id="s-bio" rows={3} placeholder="A line about your research interests" />
        </div>
        <h3 className="form-title">Notifications</h3>
        <Toggle label="Email me when my paper is reviewed" defaultOn />
        <Toggle label="Comments on my posts" defaultOn />
        <Toggle label="New members in my communities" />
        <button className="btn btn-primary">Save changes</button>
      </form>
    </div>
  )
}

export function Help() {
  return (
    <div className="page">
      <PageHeader title="Help center" sub="Answers to common questions about SNARP." />
      <div className="panel faq">
        {FAQ.map((f) => (
          <details key={f.q}>
            <summary>{f.q}<CaretDown size={18} /></summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
      <div className="panel help-contact">
        <h3>Still need help?</h3>
        <p>Write to <a href="mailto:info@uptoskills.com">info@uptoskills.com</a> or call <a href="tel:+919319772294">+91 93197 72294</a>.</p>
      </div>
    </div>
  )
}

export function Search() {
  const [params] = useSearchParams()
  const q = (params.get('q') ?? '').toLowerCase()
  const has = (...fields) => fields.join(' ').toLowerCase().includes(q)
  const communities = COMMUNITIES.filter((c) => has(c.name, c.tagline))
  const articles = ARTICLES.filter((a) => has(a.title, a.abstract, a.authors.join(' '), a.domain, a.tags.join(' ')))
  const events = EVENTS.filter((e) => has(e.title, e.kind, e.place))
  const total = communities.length + articles.length + events.length
  return (
    <div className="page">
      <PageHeader title={`Results for "${params.get('q') ?? ''}"`} sub={`${total} result${total === 1 ? '' : 's'}`} />
      {total === 0 && <div className="panel empty"><h3>Nothing found</h3><p>Try a different word, like a topic or an author.</p></div>}
      {articles.length > 0 && <><h2 className="section-title">Research papers</h2><div className="stack">{articles.map((a) => <ArticleCard key={a.id} a={a} />)}</div></>}
      {communities.length > 0 && <><h2 className="section-title">Communities</h2><div className="card-grid">{communities.map((c) => <CommunityCard key={c.id} c={c} />)}</div></>}
      {events.length > 0 && <><h2 className="section-title">Events</h2><div className="stack">{events.map((e) => <EventCard key={e.id} e={e} />)}</div></>}
      <p className="muted-sm search-foot"><Link to="/">Back to feed</Link></p>
    </div>
  )
}
