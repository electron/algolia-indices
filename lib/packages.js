const packages = require('electron-npm-packages')

module.exports = packages.map(pkg => {
  const defaults = {
    type: 'package',
    title: pkg.name
  }

  return Object.assign(defaults, pkg)
})
