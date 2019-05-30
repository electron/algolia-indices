const assert = require('assert')
const { chunk } = require('lodash')
const algoliasearch = require('algoliasearch')
const countArrayValues = require('count-array-values')

module.exports = class AlgoliaIndex {
  constructor (name, records) {
    this.name = name
    this.records = records
    this.validate()
    return this
  }

  validate () {
    assert(typeof this.name === 'string' && this.name.length, '`name` is required')
    assert(Array.isArray(this.records) && this.records.length, '`records` must be a non-empty array')

    // each ID is unique
    const objectIDs = this.records.map(record => record.objectID)
    const dupes = countArrayValues(objectIDs)
      .filter(({ value, count }) => count > 1)
      .map(({ value }) => value)
    assert(!dupes.length, `every objectID must be unique. dupes: ${dupes.join('; ')}`)

    this.records.forEach(record => {
      assert(
        typeof record.objectID === 'string' && record.objectID.length,
        `objectID must be a string. received: ${record.objectID}, ${JSON.stringify(record)}`
      )

      assert(
        Array.isArray(record.keyValuePairs) && record.keyValuePairs.length,
        `keyValuePairs must be a non-empty array, , ${JSON.stringify(record)}`
      )
    })

    return true
  }

  async upload () {
    this.validate()

    const { ALGOLIA_APPLICATION_ID, ALGOLIA_API_KEY } = process.env
    const client = algoliasearch(ALGOLIA_APPLICATION_ID, ALGOLIA_API_KEY)
    await client.deleteIndex(this.name)
    const index = client.initIndex(this.name)
    const chunks = chunk(this.records, 1000)

    chunks.map(function (batch) {
      return index.addObjects(batch)
    })
  }
}
