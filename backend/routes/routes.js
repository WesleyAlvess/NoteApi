const express = require('express')
const routes = express.Router()

const NotesController = require('../controllers/NotesController')
const PriorityController = require('../controllers/PriorityController')
const ContentController = require('../controllers/ContentController')

// Rota Notes
routes.post('/notes', NotesController.create)
routes.get('/notes', NotesController.read)
routes.delete('/notes/:id', NotesController.delete)

// Rota Priority
routes.get('/priority', PriorityController.read)
routes.post('/priority/:id', PriorityController.update)

// Rota UpdateContent
routes.post('/update/:id', ContentController.updateContent)

module.exports = routes