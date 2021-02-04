// @ts-check

// !!! Sharing the dependencies of caz
module.paths = require.main.paths

const path = require('path')
const chalk = require('chalk')
const { name, version } = require('./package.json')

/** @type {import('caz').Template} */
module.exports = {
  name,
  version<% if (source !== 'template') { %>,
  source: '<%= source %>'<% } if (features.includes('metadata')) { %>,
  metadata: {
    // TODO: predefined template metadata
    year: new Date().getFullYear()
  }<% } if (features.includes('prompts')) { %>,
  prompts: [
    // TODO: custom template prompts
    {
      name: 'name',
      type: 'text',
      message: 'Project name'
    },
    {
      name: 'version',
      type: 'text',
      message: 'Project version'
    },
    {
      name: 'description',
      type: 'text',
      message: 'Project description',
      initial: 'Awesome <%= name %> apps.'
    },
    {
      name: 'author',
      type: 'text',
      message: 'Project author name'
    },
    {
      name: 'email',
      type: 'text',
      message: 'Project author email'
    },
    {
      name: 'url',
      type: 'text',
      message: 'Project author url'
    },
    {
      name: 'github',
      type: 'text',
      message: 'GitHub username or organization',
      initial: 'zce'
    },
    {
      name: 'features',
      type: 'multiselect',
      message: 'Choose the features you need',
      instructions: false,
      choices: [
        { title: 'Foo', value: 'foo' },
        { title: 'Bar', value: 'bar', selected: true }
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
        { title: 'yarn', value: 'yarn' },
        { title: 'pnpm', value: 'pnpm' }
      ]
    }
  ]<% } if (features.includes('filters')) { %>,
  filters: {
    // TODO: custom template filters
    /** @param {{ features: string[] }} answers */
    'test/**': answers => answers.features.includes('test')
  }<% } if (features.includes('helpers')) { %>,
  helpers: {
    // TODO: custom template helpers
    upper: input => input.toUpperCase()
  }<% } if (features.includes('install')) { %>,
  // TODO: enable install by npm / yarn
  install: 'npm'<% } if (features.includes('init')) { %>,
  // TODO: enable git init
  init: true<% } if (features.includes('setup')) { %>,
  setup: async ctx => {
    // TODO: custom template setup hook, execute after template loaded & inquire completed.
    console.log('setup', ctx)
    ctx.config.install = ctx.answers.install && ctx.answers.pm
  }<% } if (features.includes('prepare')) { %>,
  prepare: async ctx => {
    // TODO: custom template prepare hook, execute after template files prepare, before rename & render.
    console.log('prepare', ctx)
  }<% } if (features.includes('emit')) { %>,
  emit: async ctx => {
    // TODO: custom template emit hook, execute after all files emit to the destination.
    console.log('emit', ctx)
  }<% } if (features.includes('complete') && complete === 'callback') { %>,
  complete: async ctx => {
    // TODO: custom complete callback
    console.clear()
    console.log(chalk`Created a new project in {cyan <%= '${ctx.project}' %>} by the {blue <%= '${ctx.template}' %>} template.\n`)
    console.log('Getting Started:')
    if (ctx.dest !== process.cwd()) {
      console.log(chalk`  $ {cyan cd <%= '${path.relative(process.cwd(), ctx.dest)}' %>}`)
    }
    if (ctx.config.install === false) {
      console.log(chalk`  $ {cyan npm install} {gray # or yarn}`)
    }
    console.log(chalk`  $ {cyan <%= '${ctx.config.install ? ctx.config.install : \'npm\'}' %> test}`)
    console.log('\nHappy hacking :)\n')
  }<% } if (features.includes('complete') && complete === 'message') { %>,
  // TODO: custom complete message
  complete: '\nHappy hacking :)\n'<% } %>
}
