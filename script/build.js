#!/usr/bin/env node

const {chain} = require('lodash')
const apis = require('../lib/electron-apis')
const tutorials = require('../lib/tutorials.js')
const apps = require('../lib/apps.js')
const results = chain([apis, tutorials, apps])
  .flatten()
  .value()

process.stdout.write(JSON.stringify(results, null, 2))
