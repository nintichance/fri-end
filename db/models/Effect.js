const mongoose = require('mongoose')
const Schema = require('../schema')
 
const Effect = mongoose.model('Effect', Schema.EffectSchema)

module.exports = Effect