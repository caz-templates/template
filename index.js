// !!! Sharing the dependencies of zce-cli
module.paths = module.parent.paths
//

const path = require('path')
const chalk = require('chalk')
const caz = require('caz')
const pkg = require('./package.json')

/** @type {import('caz').Template} */
module.exports = {
  name: pkg.name,
  version: pkg.version,
  source: 'template',
  metadata: {
    year: new Date().getFullYear()
  },
  prompts: [
    {
      type: 'text',
      name: 'name',
      message: 'Template name'
    },
    {
      type: 'text',
      name: 'version',
      message: 'Template version'
    },
    {
      type: 'text',
      name: 'description',
      message: 'Template description',
      initial: (prev, values) => `A template for creating ${values.name} apps.`
    },
    {
      type: 'text',
      name: 'author',
      message: 'Template author name'
    },
    {
      type: 'text',
      name: 'email',
      message: 'Template author email'
    },
    {
      type: 'text',
      name: 'url',
      message: 'Template author url'
    },
    {
      type: 'text',
      name: 'github',
      message: 'GitHub username or organization',
      initial: 'caz-templates'
    },
    {
      type: 'text',
      name: 'source',
      message: 'Template source directory name',
      initial: 'template'
    },
    {
      type: 'multiselect',
      name: 'features',
      message: 'Choose the features you need',
      instructions: false,
      choices: [
        { name: 'Custom metadata', value: 'metadata' },
        { name: 'Custom prompts', value: 'prompts', selected: true },
        { name: 'Custom filters', value: 'filters' },
        { name: 'Custom helpers', value: 'helpers' },
        { name: 'Custom deps install', value: 'install' },
        { name: 'Custom git init', value: 'init' },
        { name: 'Custom setup hook', value: 'setup' },
        { name: 'Custom prepare hook', value: 'prepare' },
        { name: 'Custom emit hook', value: 'emit' },
        { name: 'Custom complete', value: 'complete', selected: true },
        { name: 'Additional docs', value: 'docs' },
        { name: 'Automatic test', value: 'test', selected: true }
      ]
    },
    {
      type: prev => prev.includes('complete') ? 'select' : null,
      name: 'complete',
      message: 'Complete type',
      hint: ' ',
      choices: [
        { name: 'Callback', value: 'callback' },
        { name: 'Message', value: 'message' }
      ]
    },
    {
      type: 'confirm',
      name: 'install',
      message: 'Install dependencies',
      initial: true
    },
    {
      type: prev => prev ? 'select' : null,
      name: 'pm',
      message: 'Package manager',
      hint: ' ',
      choices: [
        { title: 'npm', value: 'npm' },
        { title: 'yarn', value: 'yarn' },
        { title: 'pnpm', value: 'pnpm' }
      ]
    }
  ],
  filters: {
    /** @param {{ features: string[] }} answers */
    'docs/**': answers => answers.features.includes('docs'),
    /** @param {{ features: string[] }} answers */
    'test/**': answers => answers.features.includes('test'),
    /** @param {{ features: string[] }} answers */
    '.travis.yml': answers => answers.features.includes('test')
  },
  init: true,
  prepare: ctx => {
    ctx.config.install = ctx.answers.pm
  },
  complete: ctx => {
    console.clear()

    console.log(chalk`Created a new project in {cyan ${ctx.project}} by the {blue ${caz.file.tildify(ctx.template)}} template.\n`)

    console.log('Getting Started:')

    if (ctx.dest !== process.cwd()) {
      console.log(chalk`  $ {cyan cd ${path.relative(process.cwd(), ctx.dest)}}`)
    }

    if (ctx.config.install === false) {
      console.log(chalk`  $ {cyan npm install} {gray # or yarn}`)
    }

    console.log(chalk`  $ {cyan ${ctx.config.install ? ctx.config.install : 'npm'} test}`)

    console.log('\nHappy hacking :)\n')
  }
}
