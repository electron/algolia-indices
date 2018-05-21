const apps = require('electron-apps')
const AlgoliaIndex = require('../lib/algolia-index')

module.exports = new AlgoliaIndex('apps', getRecords())

function getRecords () {
  return apps.map(app => {
    app.objectID = `app-${app.slug}`

    // remove large fields to avoid going over algolia plan limits
    delete app.latestRelease
    delete app.readmeCleaned
    delete app.readmeOriginal

    return app
  })
}
