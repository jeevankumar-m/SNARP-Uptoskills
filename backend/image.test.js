import { test } from 'node:test'
import assert from 'node:assert/strict'
import { sniffImage } from './image.js'

test('sniffImage detects real image bytes and rejects everything else', () => {
  assert.equal(sniffImage(Buffer.from([0xff, 0xd8, 0xff, 0xe0])), 'image/jpeg')
  assert.equal(sniffImage(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0])), 'image/png')
  assert.equal(sniffImage(Buffer.from('GIF89a')), 'image/gif')
  assert.equal(sniffImage(Buffer.from('RIFF\0\0\0\0WEBPVP8 ')), 'image/webp')
  assert.equal(sniffImage(Buffer.from('<svg onload=alert(1)>')), null)
  assert.equal(sniffImage(Buffer.from('%PDF-1.7')), null)
  assert.equal(sniffImage(Buffer.alloc(0)), null)
})
