const html = require('nanohtml')
const instantsearch = require('instantsearch.js')
document.title = 'Electron Search'

const $main = html`
<main>
  <style>
    * {
     box-sizing: border-box;
    }

    body {  
      padding: 50px;
      font-family: 'helvetica neue', helvetica, arial;
    }

    #search-box input {
      padding: 10px;
      width: 100%;
    }

    .ais-hits--item {
      padding: 10px;
    }

    .ais-hits--item em {
      background-color: yellow;
    }

    .ais-search-box--magnifier {
      display: none;
    }

    .ais-search-box--reset {
      top: 12px;
      width: 30px;
      height: 30px;
      border: none;
      position: absolute;
      right: 10px;
      opacity: 0.2;
    }
  </style>

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
    attributeName: 'type'
  })
)

search.start()

// autocomplete(/* your existing code */)
//   .on('autocomplete:selected', function (event, suggestion, dataset) {
//     location.href = suggestion.url
//   })
