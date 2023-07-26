// @ts-check

const fs = require('fs')
const path = require('path')
const assert = require('assert')
const { default: caz, inject } = require('caz')

console.log = () => {}
console.clear = () => {}

process.env.NODE_ENV = 'test'

const temp = path.join(__dirname, 'temp')
const template = path.join(temp, 'source')

fs.mkdirSync(template, { recursive: true })
fs.cpSync(path.join(__dirname, 'index.js'), path.join(template, 'index.js'))
fs.cpSync(path.join(__dirname, 'package.json'), path.join(template, 'package.json'))
fs.cpSync(path.join(__dirname, '<%= source %>'), path.join(template, '<%= source %>'), { recursive: true })

const assertGenerated = async (input, output) => {
  inject(input)
  const project = path.join(temp, input[0])
  await caz(template, project, { force: true })
  for (const item of output) {
    const exists = fs.existsSync(path.join(project, item))
    assert.strictEqual(exists, true, `Expected <%= '${item}' %> to exist.`)
  }
}

const test = async () => {
  // TODO: test with different template or different answers
  await assertGenerated(
    [
      'minimal',
      '0.1.0',
      'minimal template',
      'author',
      'user@acme.sh',
      'https://acme.sh',
      'acme',
      [],
      false,
      'npm'
    ],
    [
      '.git',
      'LICENSE',
      'package.json',
      'README.md'
    ]
  )
  console.info('\x1b[91m→ minimal passed\x1b[0m')

  await assertGenerated(
    [
      'maximal',
      '0.1.0',
      'maximal template',
      'author',
      'user@acme.sh',
      'https://acme.sh',
      'acme',
      [ 'foo', 'bar' ],
      true,
      'npm'
    ],
    [
      '.git',
      'LICENSE',
      'package-lock.json',
      'package.json',
      'README.md'
    ]
  )
  console.info('\x1b[91m→ maximal passed\x1b[0m')

  fs.rmSync(temp, { recursive: true })
}

test().catch(err => {
  console.error(err)
  process.exit(1)
})
