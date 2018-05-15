# electron-algolia-index

> Algolia search index data for Electron APIs, Tutorials, Packages, and Repos

This project collects Electron-related documentation from various sources
and assembles it into a single JSON object for consumption by the Algolia
search engine.

Content Type | Data Source
------------ | -----------
APIs | [electron-api.json](https://electronjs.org/blog/api-docs-json-schema)
Tutorials | [electron-i18n](https://github.com/electron/i18n#usage)
Packages | [electron-npm-packages](https://ghub.io/electron-npm-packages)
Repos | [electron/dependent-repos](https://github.com/electron/dependent-repos)

## Questions for Algolia Folks

- how do we see the context object that is passed to the hit template?
- how can we use a different HTML template per data type?
  - fallback idea: mustache logic - https://stackoverflow.com/a/6479017/95670
- refinementList in demo.js is not working. What is missing?
- how can we update the index using node (instead of the website)?

## Usage

Try out the demo search interface:

```sh
git clone https://github.com/electron/electron-algolia-index
cd electron-algolia-index
npm install
npm start
```

## License

MIT
