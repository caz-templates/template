# @<%= github %>/<%= name %>
<% if (features.includes('test')) { %>
[![Build Status][travis-img]][travis-url]<% } %>
[![Dependency Status][dependency-img]][dependency-url]
[![devDependency Status][devdependency-img]][devdependency-url]
[![Code Style][style-img]][style-url]

> <%= description %>

## Usage

Prerequisites: [Node.js](https://nodejs.org) (>= 10.12, 14.16 preferred), [npm](https://www.npmjs.com) (>= 6.x) or [yarn](https://yarnpkg.com) (>= 1.20) and [Git](https://git-scm.com).

```shell
# create <%= name %> apps by this template
$ npx caz <%= name %> my-<%= name %>

# enter generated directory
$ cd my-<%= name %>

# running test if you choose test features
$ npm test # or `yarn test`
```

Or use globally installed CAZ:

```shell
# Install the `caz` globally
$ npm install caz --global # or `yarn global add caz`

# create <%= name %> apps by this template
$ caz <%= name %> my-<%= name %>

# enter generated directory
$ cd my-<%= name %>

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

[MIT](LICENSE) &copy; [<%= author %>](<%= url %>)


<% if (features.includes('test')) { %>
[travis-img]: https://img.shields.io/travis/com/<%= github %>/<%= name %>
[travis-url]: https://travis-ci.com/<%= github %>/<%= name %><% } %>
[dependency-img]: https://img.shields.io/david/<%= github %>/<%= name %>
[dependency-url]: https://david-dm.org/<%= github %>/<%= name %>
[devdependency-img]: https://img.shields.io/david/dev/<%= github %>/<%= name %>
[devdependency-url]: https://david-dm.org/<%= github %>/<%= name %>?type=dev
[style-img]: https://img.shields.io/badge/code_style-standard-brightgreen
[style-url]: https://standardjs.com
