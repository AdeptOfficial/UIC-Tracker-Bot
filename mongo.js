/**
 * @author Leland 'AdepT' Moy
 * @license AdeptProduction
 * @file mongo.js
 * @info connecting to mongo server
 */

const mongoose = require('mongoose')
const { mongoPath } = require('./config.js')

module.exports = async () => {
    await mongoose.connect(mongoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    return mongoose
}