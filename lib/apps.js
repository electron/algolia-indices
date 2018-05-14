const apps = require('electron-apps')

module.exports = apps.map(app => {
  const defaults = {
    type: 'app',
    title: app.name
  }
  return Object.assign(defaults, app)
})
