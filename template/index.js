// // !!! Sharing the dependencies of caz
// module.paths = module.parent.paths

// const path = require('path')
// const chalk = require('chalk')
// const caz = require('caz')
const pkg = require('./package.json')

/** @type {import('caz').Template} */
module.exports = {
  name: pkg.name,
  version: pkg.version<% if (source !== 'template') { %>,
  source: '<%= source %>'<% } if (features.includes('metadata')) { %>,
  metadata: {
    // TODO: predefined template metadata
    // year: new Date().getFullYear()
  }<% } if (features.includes('prompts')) { %>,
  prompts: [
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
      initial: (prev, values) => `A template for creating <%= '${values.name}' %> apps.`
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
      initial: 'caz-templates'
    },
    {
      name: 'features',
      type: 'multiselect',
      message: 'Choose the features you need',
      instructions: false,
      choices: [
        { name: 'Feature1', value: 'feature1' },
        { name: 'Feature2', value: 'feature2', selected: true }
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
  ]<% } if (features.includes('filters')) { %>,
  filters: {
    // TODO: custom filters
    // /** @param {{ features: string[] }} answers */
    // 'test/**': answers => answers.features.includes('test'),
    // /** @param {{ features: string[] }} answers */
    // '.travis.yml': answers => answers.features.includes('test')
  }<% } if (features.includes('helpers')) { %>,
  helpers: {
    // TODO: custom helpers
    // upper: str => str.toUpperCase()
  }<% } if (features.includes('install')) { %>,
  // TODO: install by npm / yarn
  install: 'npm'<% } if (features.includes('init')) { %>,
  // TODO: git init
  init: true<% } if (features.includes('setup')) { %>,
  setup: async ctx => {
    // TODO: custom setup hook
    // ctx.config.install = ctx.answers.pm
  }<% } if (features.includes('prepare')) { %>,
  prepare: async ctx => {
    // TODO: custom prepare hook
    // console.log('prepare', ctx)
  }<% } if (features.includes('emit')) { %>,
  emit: async ctx => {
    // TODO: custom emit hook
    // console.log('emit', ctx)
  }<% } if (features.includes('complete') && complete === 'callback') { %>,
  complete: async ctx => {
    // TODO: generate complete callback
    // console.clear()
    // console.log(chalk`Created a new project in {cyan <%= '${ctx.project}' %>} by the {blue <%= '${caz.file.tildify(ctx.template)}' %>} template.\n`)
    // console.log('Getting Started:')
    // if (ctx.dest !== process.cwd()) {
    //   console.log(chalk`  $ {cyan cd <%= '${path.relative(process.cwd(), ctx.dest)}' %>}`)
    // }
    // if (ctx.config.install == false) {
    //   console.log(chalk`  $ {cyan npm install} {gray # or yarn}`)
    // }
    // console.log(chalk`  $ {cyan <%= '${config.config.install ? config.config.install : \'npm\'}' %> test}`)
    // console.log('\nHappy hacking :)\n')
  }<% } if (features.includes('complete') && complete === 'message') { %>,
  // TODO: complete message
  complete: '\nHappy hacking :)\n'<% } %>
}
