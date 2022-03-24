const fs = require('fs')
const { join } = require('path')
const { default: caz, inject } = require('caz')

const temp = join(__dirname, 'temp')
const template = join(temp, 'src')

beforeAll(async () => {
  jest.spyOn(console, 'log').mockImplementation()
  jest.spyOn(console, 'clear').mockImplementation()
  await fs.promises.mkdir(template, { recursive: true })
  await fs.promises.cp(join(__dirname, 'index.js'), join(template, 'index.js'))
  await fs.promises.cp(join(__dirname, 'package.json'), join(template, 'package.json'))
  await fs.promises.cp(join(__dirname, 'template'), join(template, 'template'), { recursive: true })
})

test('minimal', async () => {
  inject([
    'minimal',
    '0.1.0',
    'minimal template',
    'zce',
    'w@zce.me',
    'https://zce.me',
    'zce',
    'template',
    [],
    'message',
    false,
    'npm'
  ])
  const project = join(temp, 'minimal')
  await caz(template, project, { force: true })
  expect(fs.existsSync(project)).toBe(true)
  expect(fs.existsSync(join(project, '.git'))).toBe(true)
  expect(fs.existsSync(join(project, '.vscode/extensions.json'))).toBe(true)
  expect(fs.existsSync(join(project, '.vscode/settings.json'))).toBe(true)
  expect(fs.existsSync(join(project, 'template/package.json'))).toBe(true)
  expect(fs.existsSync(join(project, 'template/LICENSE'))).toBe(true)
  expect(fs.existsSync(join(project, 'template/README.md'))).toBe(true)
  expect(fs.existsSync(join(project, '.editorconfig'))).toBe(true)
  expect(fs.existsSync(join(project, '.gitignore'))).toBe(true)
  expect(fs.existsSync(join(project, 'index.js'))).toBe(true)
  expect(fs.existsSync(join(project, 'LICENSE'))).toBe(true)
  expect(fs.existsSync(join(project, 'package.json'))).toBe(true)
  expect(fs.existsSync(join(project, 'README.md'))).toBe(true)
})

test('maximal', async () => {
  inject([
    'maximal',
    '0.1.0',
    'maximal template',
    'zce',
    'w@zce.me',
    'https://zce.me',
    'zce',
    'source',
    [
      'metadata',
      'prompts',
      'filters',
      'helpers',
      'install',
      'init',
      'setup',
      'prepare',
      'emit',
      'complete',
      'test'
    ],
    'callback',
    true,
    'npm'
  ])
  const project = join(temp, 'maximal')
  await caz(template, project, { force: true })
  expect(fs.existsSync(project)).toBe(true)
  expect(fs.existsSync(join(project, '.git'))).toBe(true)
  expect(fs.existsSync(join(project, '.vscode/extensions.json'))).toBe(true)
  expect(fs.existsSync(join(project, '.vscode/settings.json'))).toBe(true)
  expect(fs.existsSync(join(project, 'node_modules'))).toBe(true)
  expect(fs.existsSync(join(project, 'source/package.json'))).toBe(true)
  expect(fs.existsSync(join(project, 'source/LICENSE'))).toBe(true)
  expect(fs.existsSync(join(project, 'source/README.md'))).toBe(true)
  expect(fs.existsSync(join(project, '.editorconfig'))).toBe(true)
  expect(fs.existsSync(join(project, '.gitignore'))).toBe(true)
  expect(fs.existsSync(join(project, '.travis.yml'))).toBe(true)
  expect(fs.existsSync(join(project, 'index.js'))).toBe(true)
  expect(fs.existsSync(join(project, 'index.test.js'))).toBe(true)
  expect(fs.existsSync(join(project, 'LICENSE'))).toBe(true)
  expect(fs.existsSync(join(project, 'package-lock.json'))).toBe(true)
  expect(fs.existsSync(join(project, 'package.json'))).toBe(true)
  expect(fs.existsSync(join(project, 'README.md'))).toBe(true)
})

afterAll(async () => {
  jest.clearAllMocks()
  await fs.promises.rm(temp, { recursive: true })
})
