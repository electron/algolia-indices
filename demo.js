const html = require('nanohtml')
const algoliasearch = require('algoliasearch')
const instantsearch = require('instantsearch.js').default
document.title = 'Electron Search'

const $main = html`
<main>
  <div id="search-box"></div>
  <div id="refinement-list"></div>
  <div id="hits"></div>
</main>
`

const hitTemplate = `
{{#_highlightResult.icon64}}
  <img src="https://electronjs.org/app-img/{{#helpers.highlight}}{ "attribute": "slug" }{{/helpers.highlight}}/{{#helpers.highlight}}{ "attribute": "icon64" }{{/helpers.highlight}}">
  <b>{{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}}</b> -
  {{#helpers.highlight}}{ "attribute": "description" }{{/helpers.highlight}}
{{/_highlightResult.icon64}}

{{^_highlightResult.icon64}}
  {{{type.value}}}
  <b>{{#helpers.highlight}}{ "attribute": "title" }{{/helpers.highlight}}</b> -
  {{#helpers.highlight}}{ "attribute": "tldr" }{{/helpers.highlight}}
{{/_highlightResult.icon64}}
`

document.body.appendChild($main)

const search = instantsearch({
  searchClient: algoliasearch('L9LD9GHGQJ', '24e7e99910a15eb5d9d93531e5682370'),
  indexName: 'electron-apis',
  routing: true
})

search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      empty: 'No results',
      item: hitTemplate
    },
    transformItems: items =>
      // eslint-disable-next-line
      items.map(item => (console.log(item), {
        ...item
      }))
  })
)

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#search-box',
    placeholder: 'Search Electron APIs'
  })
)

search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#refinement-list',
    attribute: 'type',
    limit: 10,
    templates: {
      header: 'Types'
    }
  })
)

search.start()

search.on('render', (...args) => {
  // console.log('algolia render', args)
})

search.on('error', (...args) => {
  console.log('algolia error', args)
})
