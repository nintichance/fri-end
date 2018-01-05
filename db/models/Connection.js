const mongoose = require('mongoose')
const Schema = require('../schema')
 
const Connection = mongoose.model('Connection', Schema.ConnectionSchema)

module.exports = Connection