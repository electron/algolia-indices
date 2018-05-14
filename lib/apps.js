const apps = require('electron-apps')

module.exports = apps.map(app => {
  const defaults = {
    type: 'app',
    title: app.name
  }

  // remove large string fields to avoid going over algolia plan limits
  delete app.latestRelease
  delete app.readmeCleaned
  delete app.readmeOriginal

  return Object.assign(defaults, app)
})
