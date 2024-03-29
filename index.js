// @ts-check

const path = require('path')
const { name, version } = require('./package.json')

/** @type {import('caz').Template} */
module.exports = {
  name,
  version,
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
      /** @param {any} _ @param {{ name: string }} values */
      initial: (_, values) => `A template for creating ${values.name} apps.`
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
        { title: 'Custom install', value: 'install' },
        { title: 'Custom git init', value: 'init' },
        { title: 'Custom setup hook', value: 'setup' },
        { title: 'Custom prepare hook', value: 'prepare' },
        { title: 'Custom emit hook', value: 'emit' },
        { title: 'Custom complete', value: 'complete', selected: true },
        { title: 'Automatic test', value: 'test', selected: true }
      ]
    },
    {
      name: 'complete',
      type: prev => process.env.NODE_ENV === 'test' || prev.includes('complete') ? 'select' : null,
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
      type: prev => process.env.NODE_ENV === 'test' || prev ? 'select' : null,
      message: 'Package manager',
      hint: ' ',
      choices: [
        { title: 'npm', value: 'npm' },
        { title: 'pnpm', value: 'pnpm' },
        { title: 'yarn', value: 'yarn' }
      ]
    }
  ],
  filters: {
    /** @param {{ features: string[] }} answers */
    'index.test.js': answers => answers.features.includes('test'),
    /** @param {{ features: string[] }} answers */
    '.travis.yml': answers => answers.features.includes('test')
  },
  init: true,
  setup: async ctx => {
    ctx.config.install = ctx.answers.install && ctx.answers.pm
  },
  complete: async ctx => {
    const client = ctx.config.install ? ctx.config.install : 'npm'
    console.clear()
    console.log(`Created a new project in ${ctx.project} by the ${ctx.template} template.\n`)
    console.log('Getting Started:')
    if (ctx.dest !== process.cwd()) {
      console.log(`  $ cd ${path.relative(process.cwd(), ctx.dest)}`)
    }
    if (ctx.config.install === false) {
      console.log(`  $ ${client} install`)
    }
    console.log(`  $ ${client} test`)
    console.log('\nHappy hacking :)\n')
  }
}
