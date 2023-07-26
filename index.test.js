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
fs.cpSync(path.join(__dirname, 'template'), path.join(template, 'template'), { recursive: true })

const assertGenerated = async (input, output) => {
  inject(input)
  const project = path.join(temp, input[0])
  await caz(template, project, { force: true })
  for (const item of output) {
    const exists = fs.existsSync(path.join(project, item))
    assert.strictEqual(exists, true, `Expected ${item} to exist.`)
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
      'template',
      [],
      'message',
      false,
      'npm'
    ],
    [
      '.git',
      '.vscode/extensions.json',
      '.vscode/settings.json',
      'template/package.json',
      'template/LICENSE',
      'template/README.md',
      '.gitignore',
      'index.js',
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
      'source',
      [ 'metadata', 'prompts', 'filters', 'helpers', 'install', 'init', 'setup', 'prepare', 'emit', 'complete', 'test' ],
      'callback',
      true,
      'npm'
    ],
    [
      '.git',
      '.vscode/extensions.json',
      '.vscode/settings.json',
      'node_modules',
      'source/package.json',
      'source/LICENSE',
      'source/README.md',
      '.gitignore',
      '.travis.yml',
      'index.js',
      'index.test.js',
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
