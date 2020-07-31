// @ts-check

// !!! Sharing the dependencies of caz
module.paths = module.parent.paths

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
      name: 'name',
      type: 'text',
      message: 'Template name'
    },
    {
      name: 'version',
      type: 'text',
      message: 'Template version'
    },
    {
      name: 'description',
      type: 'text',
      message: 'Template description',
      initial: (prev, values) => `A template for creating ${values.name} apps.`
    },
    {
      name: 'author',
      type: 'text',
      message: 'Template author name'
    },
    {
      name: 'email',
      type: 'text',
      message: 'Template author email'
    },
    {
      name: 'url',
      type: 'text',
      message: 'Template author url'
    },
    {
      name: 'github',
      type: 'text',
      message: 'GitHub username or organization',
      initial: 'caz-templates'
    },
    {
      name: 'source',
      type: 'text',
      message: 'Template source directory name',
      initial: 'template'
    },
    {
      name: 'features',
      type: 'multiselect',
      message: 'Choose the features you need',
      instructions: false,
      choices: [
        { title: 'Custom metadata', value: 'metadata' },
        { title: 'Custom prompts', value: 'prompts', selected: true },
        { title: 'Custom filters', value: 'filters' },
        { title: 'Custom helpers', value: 'helpers' },
        { title: 'Custom deps install', value: 'install' },
        { title: 'Custom git init', value: 'init' },
        { title: 'Custom setup hook', value: 'setup' },
        { title: 'Custom prepare hook', value: 'prepare' },
        { title: 'Custom emit hook', value: 'emit' },
        { title: 'Custom complete', value: 'complete', selected: true },
        { title: 'Additional docs', value: 'docs' },
        { title: 'Automatic test', value: 'test', selected: true }
      ]
    },
    {
      name: 'complete',
      type: prev => prev.includes('complete') ? 'select' : null,
      message: 'Complete type',
      hint: ' ',
      choices: [
        { title: 'Callback', value: 'callback' },
        { title: 'Message', value: 'message' }
      ]
    },
    {
      name: 'install',
      type: 'confirm',
      message: 'Install dependencies',
      initial: true
    },
    {
      name: 'pm',
      type: prev => prev ? 'select' : null,
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
