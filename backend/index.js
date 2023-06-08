const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const db = require('./db/db')
const routes = require('./routes/routes')
const cors = require('cors')
const bodyParser = require('body-parser')


// Cors faz a comunicação entre front e back.
app.use(cors())
// Usado para ler dados JSON
app.use(bodyParser.json())
// Rotas
app.use('/', routes)

app.listen(port, () => {
    console.log("Servidor rodando!");
})