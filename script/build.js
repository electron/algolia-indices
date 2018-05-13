#!/usr/bin/env node

const apis = require('../electron-api.json')
const results = []

apis.forEach(api => {
  // TODO constructorMethod

  const staticMethods = api.staticMethods || []
  staticMethods.forEach(method => {
    method.title = `${api.name}.${method.name}${method.signature}`
    method.type = 'staticMethod'
    method.tldr = getTLDR(method)
    const slug = method.name.replace(/\W/g, '').toLowerCase()
    method.url = `https://electronjs.org/docs/api/${api.slug}#${
      api.slug
    }${slug}`
    delete method.signature
    results.push(method)
  })

  const instanceMethods = api.instanceMethods || []
  instanceMethods.forEach(method => {
    method.title = `${api.instanceName}.${method.name}${method.signature}`
    method.type = 'instanceMethod'
    method.tldr = getTLDR(method)
    delete method.signature
    results.push(method)
  })

  const events = api.events || []
  events.forEach(event => {
    event.title = `${api.name}.on('${event.name}')`
    event.type = 'event'
    event.url = `https://electronjs.org/docs/api/${api.slug}#event-${
      event.name
    }`
    event.tldr = getTLDR(event)
    results.push(event)
  })

  const instanceEvents = api.instanceEvents || []
  instanceEvents.forEach(event => {
    event.title = `${api.instanceName}.on('${event.name}')`
    event.type = 'event'
    event.url = `https://electronjs.org/docs/api/${api.slug}#event-${
      event.name
    }`
    event.tldr = getTLDR(event)
    results.push(event)
  })
})

process.stdout.write(JSON.stringify(results, null, 2))

function getTLDR (api) {
  const { description, returns } = api

  if (!description && returns && returns.description) {
    return (
      'Returns ' +
      returns.description.charAt(0).toLowerCase() +
      returns.description.slice(1)
    )
  }

  if (typeof description !== 'string' || !description.length) return null
  return description.split('. ')[0] + '.'
}
