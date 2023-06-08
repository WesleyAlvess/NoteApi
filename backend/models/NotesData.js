const mongoose = require('mongoose')

const Note = mongoose.model('Note', {
    title: String,
    note: String,
    priority: Boolean,
})

module.exports = Note


