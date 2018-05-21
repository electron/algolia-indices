const packages = require('electron-npm-packages')
const AlgoliaIndex = require('../lib/algolia-index')

module.exports = new AlgoliaIndex('packages', getRecords())

function getRecords () {
  return packages.map(pkg => {
    pkg.objectID = `package-${pkg.name}`
    return pkg
  })
}
