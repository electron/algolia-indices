const { chain } = require('lodash')
const cheerio = require('cheerio')
const AlgoliaIndex = require('../lib/algolia-index')

module.exports = new AlgoliaIndex('tutorials', getRecords())

function getRecords () {
  return chain(Object.values(require('electron-i18n').docs['en-US']))
    .filter(tutorial => !tutorial.isApiDoc && !tutorial.isApiStructureDoc)
    .map(tutorial => {
      const { title, githubUrl, slug, sections, href } = tutorial
      const objectID = `tutorial-${slug}`
      const html = sections.map(section => section.html).join('\n\n')
      const body = cheerio.load(html).text()

      // ignore files that have been renamed
      if (!title && body.startsWith('Moved to')) return
      if (slug === 'README') return

      const keyValuePairs = [
        'is:doc',
        'is:tutorial',
        `doc:${title}`,
        `doc:${slug}`,
        `tutorial:${title}`,
        `tutorial:${slug}`
      ]

      const url = `https://electronjs.org${href}` // href includes leading slash
      return {
        objectID,
        title,
        githubUrl,
        url,
        slug,
        body,
        keyValuePairs
      }
    })
    .compact() // remove nulls from early returns above
    .value()
}
