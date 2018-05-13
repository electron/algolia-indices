const apis = require('.')
const test = require('tape')
// const isURL = require('is-url')

test('electron-search', t => {
  t.ok(Array.isArray(apis), 'is an array')
  t.ok(apis.length > 5, 'with hella entries')

  // console.log(apis.map(api => api.title))

  let staticMethod = apis.find(api => api.title === 'Menu.getApplicationMenu()')
  t.equal(staticMethod.url, 'https://electronjs.org/docs/api/menu#menugetapplicationmenu', 'sets proper URL on static methods')

  const event = apis.find(api => api.title === "win.on('page-title-updated')")
  t.equal(event.url, 'https://electronjs.org/docs/api/browser-window#event-page-title-updated', 'sets expected URL on events')

  apis.forEach(api => {
    t.equal(typeof api.title, 'string', `${api.title} has a title`)
    t.equal(typeof api.name, 'string', `${api.title} has a name`)
    // t.ok(isURL(api.url), `${api.title} has a valid URL`)
  })

  t.end()
})

// https://electronjs.org/docs/api/browser-window#event-page-title-updated
