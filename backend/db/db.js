const mongoose = require('mongoose')


const notesDataSchema = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/AppNotes')
}

notesDataSchema()
.then(() => {console.log('Conectado ao banco de dados!')})
.catch(err => console.log('Não conectado ao banco de dados', err))


