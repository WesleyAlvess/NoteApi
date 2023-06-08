const Note = require('../models/NotesData')

module.exports = {

    async read(req, res) {
        try {
            const priority = req.query
            const priorityNotes = await Note.find(priority)
            res.json(priorityNotes)

        } catch (error) {
            res.json({ error: false, message: error.message })

        }
    },

    async update(req, res) {
        try {
            const id  = req.params.id
            const note = await Note.findOne({ _id: id })
            
            if (note.priority) {
                note.priority = false
            } else {
                note.priority = true
            }

            await note.save()
            res.json(note)

        } catch (error) {
            res.json({ error: false, message: error.message })
        }
    }

}