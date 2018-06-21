#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const indices = require('../indices')

Object.keys(indices).forEach(key => {
  fs.writeFileSync(
    path.join(__dirname, `../dist/${key}.json`),
    JSON.stringify(indices[key], null, 2)
  )
})
