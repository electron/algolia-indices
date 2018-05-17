# electron-algolia-index

> Structured searchable data from Electron's APIs, Tutorials, Packages, Repos, and Apps

This project collects Electron-related documentation from various sources
and assembles it into a single JSON object for consumption by the Algolia
search engine.

## Data Sources

Type | Source
------------ | -----------
APIs | [electron-api.json](https://electronjs.org/blog/api-docs-json-schema)
Tutorials | [electron/i18n](https://github.com/electron/i18n#usage)
Packages | [electron/packages](https://ghub.io/electron-npm-packages)
Repos | [electron/repos](https://github.com/electron/dependent-repos)
Apps | [electron/apps](https://github.com/electron/apps)

## Demo

See a crude demo UI at [electron-algolia.herokuapp.com](https://electron-algolia.herokuapp.com/)

## Development

Try it out locally:

```sh
git clone https://github.com/electron/electron-algolia-index
cd electron-algolia-index
npm install
npm test
npm start
```

...

## License

MIT
