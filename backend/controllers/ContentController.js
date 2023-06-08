const Note = require('../models/NotesData')

module.exports = {

    async updateContent(req, res) {
        try {
            const id = req.params.id
            const { title, note } = req.body
            const updateNotes = await Note.findOneAndUpdate(
                { _id: id },
                {title, note},
                {new: true}
            )

            if (!updateNotes) {
                return res.json({error: true, message: 'Nota não Encontrada.'})
            }

            console.log(updateNotes)

            res.json({success: true, message: 'Nota atualizada com sucesso.' })

        } catch (error) {
            res.json({error: true, message: error.message})
        }
    }

}
