const { pick } = require('lodash')
const packages = require('electron-npm-packages')
const AlgoliaIndex = require('../lib/algolia-index')
const props = 'name description sourcerank repository keywords license homepage owners created modified dependencies devDependencies scripts'.split(' ')

module.exports = new AlgoliaIndex('packages', getRecords())

function getRecords () {
  return packages.map(pkg => {
    pkg = Object.assign(
      { objectID: `package-${pkg.name}` },
      pick(pkg, props)
    )

    if (pkg.repository && pkg.repository.https_url) {
      pkg.repository = pkg.repository.https_url
    }

    pkg.keyValuePairs = [
      'is:package',
      'is:pkg',
      `pkg:${pkg.name}`,
      `package:${pkg.name}`
    ]

    if (Array.isArray(pkg.owners)) {
      pkg.owners.forEach(({ name }) => {
        if (!name) return
        pkg.keyValuePairs.push(`owner:${name}`)
        pkg.keyValuePairs.push(`author:${name}`)
        pkg.keyValuePairs.push(`maintainer:${name}`)
      })
    }

    // algolia doesn't search on keys, so save all dep names in a searchable array
    if (pkg.dependencies) {
      pkg.depNames = Object.keys(pkg.dependencies)
      pkg.depNames.forEach(dep => {
        pkg.keyValuePairs.push(`dep:${dep}`)
      })
    }

    if (pkg.devDependencies) {
      pkg.devDepNames = Object.keys(pkg.devDependencies)
      pkg.devDepNames.forEach(dep => {
        pkg.keyValuePairs.push(`dep:${dep}`)
      })
    }

    return pkg
  })
}
