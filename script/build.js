#!/usr/bin/env node

const {chain} = require('lodash')
const apis = require('../lib/electron-apis')
const tutorials = require('../lib/tutorials')
const apps = require('../lib/apps')
const packages = require('../lib/packages')
const results = chain([apis, tutorials, apps, packages])
  .flatten()
  .value()

process.stdout.write(JSON.stringify(results, null, 2))
