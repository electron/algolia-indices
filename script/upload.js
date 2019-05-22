#!/usr/bin/env node

if (!process.env.ALGOLIA_APPLICATION_ID || !process.env.ALGOLIA_API_KEY) {
  require('dotenv-safe').load()
}

const indices = require('../indices')

for (const key in indices) {
  const index = indices[key]
  console.log(`Uploading index: ${index.name}`)
  index.upload()
}
