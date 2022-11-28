const mongoose = require('mongoose');

const stratSchema = new mongoose.Schema({
    name: String,
    map: String,
    desc: String,
    media: String
})

const stratCollection = mongoose.model('Strata', stratSchema)

module.exports = stratCollection