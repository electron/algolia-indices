const index = require('.')

module.exports = {
  context: [
    {name: 'index', value: index},
    {name: 'titles', value: index.map(index => index.title)}
  ]
}