# @caz-templates/template

[![Build Status][travis-img]][travis-url]
[![Dependency Status][dependency-img]][dependency-url]
[![Code Style][style-img]][style-url]

> A template for creating [CAZ](https://github.com/zce/caz) templates.

## Usage

Prerequisites: [Node.js](https://nodejs.org) (>= 14.14 required, >= 16.13 preferred), [npm](https://www.npmjs.com) (>= 7.x) or [yarn](https://yarnpkg.com) (>= 1.22) and [Git](https://git-scm.com).

```shell
# create templates by this template
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

# create templates by this template
$ caz template my-template

# enter generated directory
$ cd my-template

# running test if you choose test features
$ npm test # or `yarn test`
```

## Related

- [zce/caz](https://github.com/zce/caz) - A simple yet powerful template-based Scaffolding tools.

## Contributing

1. **Fork** it on GitHub!
2. **Clone** the fork to your own machine.
3. **Checkout** your feature branch: `git checkout -b my-awesome-feature`
4. **Commit** your changes to your own branch: `git commit -am 'Add some feature'`
5. **Push** your work back up to your fork: `git push -u origin my-awesome-feature`
6. Submit a **Pull Request** so that we can review your changes.

> **NOTE**: Be sure to merge the latest from "upstream" before making a pull request!

## License

[MIT](LICENSE) &copy; [zce](https://zce.me)



[travis-img]: https://img.shields.io/travis/com/caz-templates/template
[travis-url]: https://travis-ci.com/caz-templates/template
[dependency-img]: https://img.shields.io/librariesio/release/github/caz-templates/template
[dependency-url]: https://github.com/caz-templates/template
[style-img]: https://img.shields.io/badge/code_style-standard-brightgreen
[style-url]: https://standardjs.com
