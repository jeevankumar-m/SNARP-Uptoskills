import { test } from 'node:test'
import assert from 'node:assert/strict'
import { apa, bibtex } from './cite.js'

test('apa joins authors and skips missing fields', () => {
  assert.equal(
    apa({ authors: ['Iyer, R.', 'Nair, S.'], year: 2025, title: 'T', journal: 'J', volume: '9', issue: '1', pages: '45-61', doi: '10.1/x' }),
    'Iyer, R., & Nair, S. (2025). T. J, 9(1), 45-61. https://doi.org/10.1/x'
  )
  assert.equal(apa({ authors: 'Banerjee, T.', title: 'Only title' }), 'Banerjee, T. Only title.')
})

test('bibtex omits empty fields and builds a key', () => {
  assert.equal(bibtex({ authors: 'Khan, M.; Reddy, L.', year: 2024, title: 'T' }), '@article{khan2024,\n  author = {Khan, M. and Reddy, L.},\n  title = {T},\n  year = {2024}\n}')
})
