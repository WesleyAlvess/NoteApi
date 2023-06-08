import React, { useEffect, useState } from 'react';
import './styles/App.css'

import api from './services/api'
import Checkbox from '@mui/material/Checkbox';
import { GiHamburgerMenu } from 'react-icons/gi'


import Card from './components/Card';


function App() {

  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')
  const [allNotes, setAllNotes] = useState([])
  const [filterPriorities, setFilterPriorities] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [showAside, setShowAside] = useState(true)



  // Pega todas as notas
  useEffect(() => {
    async function getAllNotes() {
      const response = await api.get('/notes',)

      setAllNotes(response.data)
    }
    getAllNotes()

  }, [])

  // Cria nota
  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await api.post('/notes', {
      title,
      note,
      priority: false,
    })

    setTitle('')
    setNote('')

    setAllNotes([...allNotes, response.data])

  }

  // Habilita cor no botão quando os campos forem preenchidos
  useEffect(() => {
    let enableSubmitButton = () => {
      let btn = document.getElementById("btn_submit")
      btn.style.backgroundColor = "#a04000"

      if (title && note) {
        btn.style.backgroundColor = "#ff6600"
      }
    }
    enableSubmitButton()
  }, [title, note])


  // Busca dados atualizados do banco
  const updateNote = async () => {
    try {
      const response = await api.get('/notes')
      setAllNotes(response.data)
    } catch (error) {
      console.log("Erro ao buscar os dados atualizados:", error);
    }
  }


  const seekPriorities = async () => {
    const response = await api.get('/priority')
    const priorities = Object.values(response.data)

    const truePriorities = priorities.filter((task) => task.priority === true)
    setFilterPriorities(truePriorities)
    setShowAll(false)

  }

  const showAllNotes = () => {
    setShowAll(true)
  }

  const menuHambuger = () => {
    setShowAside(!showAside)
  }




  return (
      <div id='App'>
        <GiHamburgerMenu id='menu-icon' onClick={menuHambuger} />
        <aside id='aside' style={{ display: showAside ? 'block' : 'none' }}>
          <div className="title">
            <h1>Notes</h1>
            <p>Anotações</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-block">
              <label htmlFor="title">Titulo</label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
            </div>
            <div className="input-block">
              <label htmlFor="nota">Anotação</label>
              <textarea value={note} onChange={e => setNote(e.target.value)} name="" id="" cols="36" rows="10" required></textarea>
            </div>
            <button type="submit" id='btn_submit'>Salvar</button>
            <div className="check-filter">
              <div className="filter-Normal">
                <label>Todas</label>
                <Checkbox
                  checked={showAll}
                  onClick={showAllNotes}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </div>
              <div className="filter-prioridade">
                <label style={{ color: "#ff6600" }}>Prioridade</label>
                <Checkbox
                  checked={!showAll && seekPriorities}
                  onClick={seekPriorities}
                  style={{ color: "#ff6600" }}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </div>
            </div>
          </form>
        </aside>
        <main>
          <div id='contentCard'>
            {showAll
              ?
              allNotes.map(data => (
                <Card
                  key={data._id}
                  data={{ id: data._id, title: data.title, note: data.note, priority: data.priority }}
                  updateNote={updateNote}
                />
              ))
              :
              filterPriorities.map(data => (
                <Card
                  key={data._id}
                  data={{ id: data._id, title: data.title, note: data.note, priority: data.priority }}
                  updateNote={updateNote}
                />
              ))
            }
          </div>
        </main>
      </div>
  )
}

export default App
