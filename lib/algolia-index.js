const assert = require('assert')
const {chunk, isArray, isString} = require('lodash')
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
    assert(isString(this.name) && this.name.length, '`name` is required')
    assert(isArray(this.records) && this.records.length, '`records` must be a non-empty array')

    // each ID is unique
    const objectIDs = this.records.map(record => record.objectID)
    const dupes = countArrayValues(objectIDs)
      .filter(({value, count}) => count > 1)
      .map(({value}) => value)
    assert(!dupes.length, `every objectID must be unique. dupes: ${dupes.join('; ')}`)

    this.records.forEach(record => {
      assert(
        isString(record.objectID) && record.objectID.length,
        `objectID must be a string. received: ${record.objectID}, ${JSON.stringify(record)}`
      )
    })

    return true
  }

  upload () {
    this.validate()

    const {ALGOLIA_APPLICATION_ID, ALGOLIA_API_KEY} = process.env
    const client = algoliasearch(ALGOLIA_APPLICATION_ID, ALGOLIA_API_KEY)
    const index = client.initIndex(this.name)
    const chunks = chunk(this.records, 1000)

    chunks.map(function (batch) {
      return index.addObjects(batch)
    })
  }
}
