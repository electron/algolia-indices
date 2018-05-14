#!/usr/bin/env node

const {chain} = require('lodash')
const apis = require('../lib/electron-apis')
const tutorials = require('../lib/tutorials.js')
const results = chain([apis, tutorials]).flatten().value()

process.stdout.write(JSON.stringify(results, null, 2))
