const html = require('nanohtml')
const instantsearch = require('instantsearch.js')
document.title = 'Electron Search'

const $main = html`
<main>
  <div id="search-box"></div>
  <div id="refinement-list"></div>
  <div id="hits"></div>
</main>
`

document.body.appendChild($main)

const search = instantsearch({
  appId: 'L9LD9GHGQJ',
  apiKey: '24e7e99910a15eb5d9d93531e5682370',
  indexName: 'electron-apis',
  routing: true
})

search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      empty: 'No results',
      item: `
        {{{_highlightResult.type.value}}} 
        <b>{{{_highlightResult.title.value}}}</b> - 
        {{{_highlightResult.tldr.value}}}
      `
    }
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
    attributeName: 'type',
    limit: 10,
    templates: {
      header: 'Types'
    }
  })
)

search.start()

search.on('render', (...args) => {
  console.log('algolia render', args)
})

search.on('error', (...args) => {
  console.log('algolia error', args)
})
