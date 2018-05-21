#!/usr/bin/env node

require('dotenv-safe').load()

const indices = require('../indices')

for (const key in indices) {
  const index = indices[key]
  console.log(`Uploading index: ${index.name}`)
  index.upload()
}
