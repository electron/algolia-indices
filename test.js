const entries = require('.')
const test = require('tape')
const isURL = require('is-url')
const types = ['api', 'tutorial']

test('electron-search', t => {
  // All Entries
  // ----------------------------------------------------------------------
  t.ok(Array.isArray(entries), 'is an array')
  t.ok(entries.length > 5, 'with hella entries')
  entries.forEach(entry => {
    t.ok(types.includes(entry.type), `${entry.title} has a known type`)
  })

  // APIs
  // ----------------------------------------------------------------------
  const apis = entries.filter(entry => entry.type === 'api')

  t.ok(apis.length > 5, 'lots of APIs')

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

  tutorials.forEach(tutorial => {
    if (!tutorial.title) console.log(tutorial)
    t.equal(typeof tutorial.title, 'string', `${tutorial.title} has a title`)
    t.equal(typeof tutorial.body, 'string', `${tutorial.title} has a body`)
    t.ok(isURL(tutorial.githubUrl), `${tutorial.title} has a valid GitHub URL`)
  })

  // Packages
  // ----------------------------------------------------------------------

  // Repos
  // ----------------------------------------------------------------------

  t.end()
})
