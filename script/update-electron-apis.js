const i18n = require('electron-i18n')
const electronReleases = require('electron-releases')
const { deps: { version } } = electronReleases.find(release => release.version === i18n.electronLatestStableVersion)
const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')

fetch(`https://github.com/electron/electron/releases/download/v${version}/electron-api.json`)
  .then(res => {
    const dest = fs.createWriteStream(path.resolve(__dirname, '../electron-api.json'))
    res.body.pipe(dest)
  })
