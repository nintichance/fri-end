const mongoose = require('mongoose')
const Schema = require('../Schema')
 
const Effect = mongoose.model('Effect', Schema.EffectSchema)

module.exports = Effect