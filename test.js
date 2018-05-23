const test = require('tape')
const isURL = require('is-url')
const indices = require('./indices')

test('electron-search', t => {
  // All Indices
  // ----------------------------------------------------------------------
  const indexNames = ['apis', 'apps', 'packages', 'tutorials']
  t.deepEqual(Object.keys(indices), indexNames, 'defines expected indexNames as keys')

  t.deepEqual(Object.values(indices).map(index => index.name), indexNames, 'has expected index names')

  Object.values(indices).forEach(index => {
    t.ok(index.validate(), `index is valid: ${index.name}`)
  })

  // APIs
  // ----------------------------------------------------------------------
  const apis = indices.apis.records

  t.ok(apis.length > 450, 'lots of APIs')

  let staticMethod = apis.find(api => api.fullSignature === 'Menu.getApplicationMenu()')
  t.equal(staticMethod.url, 'https://electronjs.org/docs/api/menu#menugetapplicationmenu', 'sets proper URL on static methods')

  const event = apis.find(api => api.fullSignature === "win.on('page-title-updated')")
  t.equal(event.url, 'https://electronjs.org/docs/api/browser-window#event-page-title-updated', 'sets expected URL on events')

  apis.forEach(api => {
    t.equal(typeof api.fullSignature, 'string', `${api.fullSignature} has a fullSignature`)
    t.equal(typeof api.name, 'string', `${api.fullSignature} has a name`)
    t.ok(api.keyValuePairs.includes('is:api'), `${api.fullSignature} has is:api key-value pair`)
    t.ok(api.keyValuePairs.includes('is:doc'), `${api.fullSignature} has is:api key-value pair`)
  })

  // Tutorials
  // ----------------------------------------------------------------------
  const tutorials = indices.tutorials.records

  t.ok(tutorials.length > 25, 'lots of tutorials')

  tutorials.forEach(tutorial => {
    if (!tutorial.title) console.log(tutorial)
    t.equal(typeof tutorial.title, 'string', `${tutorial.title} has a title`)
    t.equal(typeof tutorial.body, 'string', `${tutorial.title} has a body`)
    t.ok(isURL(tutorial.githubUrl), `${tutorial.title} has a valid GitHub URL`)
    t.ok(isURL(tutorial.url), `${tutorial.title} has a valid website URL`)
    t.ok(tutorial.keyValuePairs.includes('is:doc'), `${tutorial.title} has is:doc key-value pair`)
    t.ok(tutorial.keyValuePairs.includes('is:tutorial'), `${tutorial.title} has is:tutorial key-value pair`)
  })

  // Packages
  // ----------------------------------------------------------------------
  const packages = indices.packages.records

  t.ok(packages.length > 25, 'lots of packages')

  packages.forEach(pkg => {
    if (!pkg.name) console.log(pkg)
    t.equal(typeof pkg.name, 'string', `${pkg.name} has a name`)
    t.ok(pkg.keyValuePairs.includes('is:pkg'), `${pkg.name} has is:pkg key-value pair`)
    t.ok(pkg.keyValuePairs.includes('is:pkg'), `${pkg.name} has is:package key-value pair`)
    // t.ok(isURL(pkg.githubUrl), `${pkg.title} has a valid GitHub URL`)
    // t.ok(isURL(pkg.repository), `${pkg.title} has a valid repository`)
  })

  // TODO: Apps
  // ----------------------------------------------------------------------

  // TODO: Repos
  // ----------------------------------------------------------------------

  t.end()
})
