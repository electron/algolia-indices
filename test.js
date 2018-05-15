const entries = require('.')
const test = require('tape')
const isURL = require('is-url')
const types = ['api', 'tutorial', 'app', 'package', 'repo']

test('electron-search', t => {
  // All Entries
  // ----------------------------------------------------------------------
  t.ok(Array.isArray(entries), 'is an array')
  t.ok(entries.length > 500, 'with hella entries')
  entries.forEach(entry => {
    t.ok(types.includes(entry.type), `${entry.title} has a 'type' property`)
    // t.ok(types.includes(entry.tldr), `${entry.title} has a 'tldr' property`)
    // t.ok(types.includes(entry.url), `${entry.title} has a 'url' property`)
  })

  // APIs
  // ----------------------------------------------------------------------
  const apis = entries.filter(entry => entry.type === 'api')

  t.ok(apis.length > 450, 'lots of APIs')

  let staticMethod = apis.find(api => api.title === 'Menu.getApplicationMenu()')
  t.equal(staticMethod.url, 'https://electronjs.org/docs/api/menu#menugetapplicationmenu', 'sets proper URL on static methods')

  const event = apis.find(api => api.title === "win.on('page-title-updated')")
  t.equal(event.url, 'https://electronjs.org/docs/api/browser-window#event-page-title-updated', 'sets expected URL on events')

  apis.forEach(api => {
    t.equal(typeof api.title, 'string', `${api.title} has a title`)
    t.equal(typeof api.name, 'string', `${api.title} has a name`)
    // t.ok(isURL(api.url), `${api.title} has a valid URL`)
  })

  // Tutorials
  // ----------------------------------------------------------------------
  const tutorials = entries.filter(entry => entry.type === 'tutorial')

  t.ok(tutorials.length > 25, 'lots of tutorials')

  tutorials.forEach(tutorial => {
    if (!tutorial.title) console.log(tutorial)
    t.equal(typeof tutorial.title, 'string', `${tutorial.title} has a title`)
    t.equal(typeof tutorial.body, 'string', `${tutorial.title} has a body`)
    t.ok(isURL(tutorial.githubUrl), `${tutorial.title} has a valid GitHub URL`)
    t.ok(isURL(tutorial.url), `${tutorial.title} has a valid website URL`)
  })

  // Packages
  // ----------------------------------------------------------------------
  const packages = entries.filter(entry => entry.type === 'package')

  t.ok(packages.length > 25, 'lots of packages')

  packages.forEach(pkg => {
    if (!pkg.title) console.log(pkg)
    t.equal(typeof pkg.title, 'string', `${pkg.title} has a title`)
    // t.ok(isURL(pkg.githubUrl), `${pkg.title} has a valid GitHub URL`)
    // t.ok(isURL(pkg.url), `${pkg.title} has a valid website URL`)
  })

  // Repos
  // ----------------------------------------------------------------------

  t.end()
})
