const {chain} = require('lodash')
const cheerio = require('cheerio')
const AlgoliaIndex = require('../lib/algolia-index')

module.exports = new AlgoliaIndex('glossary', getRecords())

function getRecords () {
  return chain(Object.values(require('electron-i18n').glossary['en-US']))
    .map(glossary => {
      console.log(glossary)
      const {term, description} = glossary
      const objectID = `glossary-${term}`

      const keyValuePairs = [
        'is:doc',
        'is:glossary',
        `glossary:${term}`,
      ]

      const url = `https://electronjs.org/docs/glossary#${term.toLowerCase()}`
      return {
        objectID,
        term,
        description,
        url,
        keyValuePairs
      }
    })
    .compact() // remove nulls from early returns above
    .value()
}
