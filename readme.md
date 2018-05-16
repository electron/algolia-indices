# electron-algolia-index

> Structured searchable data from Electron's APIs, Tutorials, Packages, Repos, and Apps

This project collects Electron-related documentation from various sources
and assembles it into a single JSON object for consumption by the Algolia
search engine.

## Data Sources

Type | Source
------------ | -----------
APIs | [electron-api.json](https://electronjs.org/blog/api-docs-json-schema)
Tutorials | [electron-i18n](https://github.com/electron/i18n#usage)
Packages | [electron-npm-packages](https://ghub.io/electron-npm-packages)
Repos | [electron/dependent-repos](https://github.com/electron/dependent-repos)
Apps | [electron/apps](https://github.com/electron/apps)

## Demo

Try out the demo search interface:

```sh
git clone https://github.com/electron/electron-algolia-index
cd electron-algolia-index
npm install
npm start
```

## Questions for Algolia Folks

#### how do we see the context object that is passed to the hit template?

`transformData()` doesn't seem to correlate.

#### how can we use a different HTML template per data type?
  
fallback: [mustache logic](https://stackoverflow.com/a/6479017/95670).

#### how can we separate search results by type? tutorials, APis, packages, apps, repos

`refinementList` in [demo.js](demo.js) is not working. What is missing?

#### how can we update the index using node (instead of the website)?

clear existing index and re-upload the whole thing?

#### how can we exempt parts of the template from search query emphasis?

Example: `<img src="https://electronjs.org/node_modules/electron-apps/apps/iease-<em>music</em>/iease-<em>music</em>-icon-64.png"`>

#### localization?

How can cater to different language speakers?

...

## License

MIT
