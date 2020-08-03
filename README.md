# @caz-templates/template

[![Build Status][travis-img]][travis-url]
[![Dependency Status][dependency-img]][dependency-url]
[![devDependency Status][devdependency-img]][devdependency-url]
[![Code Style][style-img]][style-url]

> A template for creating [CAZ](https://github.com/zce/caz) templates.

## Usage

Prerequisites: [Node.js](https://nodejs.org) (>= 10.17, 12.10 preferred), [npm](https://www.npmjs.com) (>= 6.x) or [yarn](https://yarnpkg.com) (>= 1.20) and [Git](https://git-scm.com).

```shell
# create templates through this
$ npx caz template my-template

# enter generated directory
$ cd my-template

# running test if you choose test features
$ npm test # or `yarn test`
```

Or use globally installed CAZ:

```shell
# Install the `caz` globally
$ npm install caz --global # or `yarn global add caz`

# create templates through this
$ caz template my-template

# enter generated directory
$ cd my-template

# running test if you choose test features
$ npm test # or `yarn test`
```

## Contributing

1. **Fork** it on GitHub!
2. **Clone** the fork to your own machine.
3. **Checkout** your feature branch: `git checkout -b my-awesome-feature`
4. **Commit** your changes to your own branch: `git commit -am 'Add some feature'`
5. **Push** your work back up to your fork: `git push -u origin my-awesome-feature`
6. Submit a **Pull Request** so that we can review your changes.

> **NOTE**: Be sure to merge the latest from "upstream" before making a pull request!

## License

[MIT](LICENSE) &copy; [汪磊](https://zce.me)



[travis-img]: https://img.shields.io/travis/com/caz-templates/template
[travis-url]: https://travis-ci.com/caz-templates/template
[dependency-img]: https://img.shields.io/david/caz-templates/template
[dependency-url]: https://david-dm.org/caz-templates/template
[devdependency-img]: https://img.shields.io/david/dev/caz-templates/template
[devdependency-url]: https://david-dm.org/caz-templates/template?type=dev
[style-img]: https://img.shields.io/badge/code_style-standard-brightgreen
[style-url]: https://standardjs.com
