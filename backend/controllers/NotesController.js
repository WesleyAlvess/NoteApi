const Note = require('../models/NotesData')

module.exports = {

    async read(req, res) {
        try {
            const note = await Note.find({})
            res.json(note)

        } catch (error) {
            res.json({ error: true, message: error.message })
        }

    },


    async create(req, res) {
        try {
            const { title, note, priority } = req.body
            const newNote = new Note({
                title,
                note,
                priority
            })

            if (!note || !title) {
                return res.status(400).json({ error: "Erro por favor preencha todos os campos" })
            }

            const savedNote = await newNote.save()
            res.json(savedNote)

        } catch (error) {
            res.json({ error: true, message: error.message })
        }

    },


    async delete(req, res) {
        try {
            const id = req.params
            const noteDel = await Note.findOneAndDelete()
            if (noteDel) {
                res.json("arquivo deletado!")
            } else {
                res.status(400).json({ error: "Arquivo inexistente!" })
            }
        } catch (error) {
            res.json({ error: true, message: error.message })
        }
    }

}