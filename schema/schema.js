const mongoose = require('mongoose')



const createLink = new mongoose.Schema({
    original: {type: String, required: true},
    shortened: {type: String, required: true}
}) 


const myDb = mongoose.connection.useDb('Link-Shortner')
const Links = myDb.model('links', createLink)

module.exports = Links




