const {pick} = require('lodash')
const packages = require('electron-npm-packages')
const AlgoliaIndex = require('../lib/algolia-index')
const props = 'name description sourcerank repository keywords license homepage owners created modified dependencies devDependencies scripts'.split(' ')

module.exports = new AlgoliaIndex('packages', getRecords())

function getRecords () {
  return packages.map(pkg => {
    pkg = Object.assign(
      {objectID: `package-${pkg.name}`},
      pick(pkg, props)
    )

    if (pkg.repository && pkg.repository.https_url) {
      pkg.repository = pkg.repository.https_url
    }

    // algolia doesn't search on keys, so save all dep names in a searchable array
    if (pkg.dependencies) {
      pkg.depNames = Object.keys(pkg.dependencies)
    }

    if (pkg.devDependencies) {
      pkg.devDepNames = Object.keys(pkg.devDependencies)
    }

    return pkg
  })
}
