const mongoose = require('mongoose')
const Schema = require('../Schema')
 
const Connection = mongoose.model('Connection', Schema.ConnectionSchema)

module.exports = Connection