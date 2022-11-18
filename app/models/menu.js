const mongoose = require('mongoose')
const Schema = mongoose.Schema

const menuSchema = new Schema ({
    name: {type: String, required: true},
    image: {type: String, required: true},
    price: {type: Number, required: true},
    size: {type: String, required: true}
})

const menu = mongoose.model('Menu',menuSchema)

module.exports = menu;