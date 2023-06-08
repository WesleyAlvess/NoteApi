import React, { useEffect, useState } from 'react';
import "./style.css"

//Icons
import { FaTrashAlt } from "react-icons/fa"
import { BsFillCheckCircleFill } from "react-icons/bs"
import { FaCloudUploadAlt } from "react-icons/fa"


// API
import api from '../../services/api';


const Card = ({ data, updateNote }) => {
    const [corElemento, setCorElemento] = useState('')
    const [isPriority, setIsPriority] = useState(
        localStorage.getItem(`card-${data.id}-priority`) === true
    )
    const [note, setNote] = useState('')


    // Captura o valor de priority e salva no local storage
    const handleIconClick = async () => {
        const newIsPriority = !isPriority
        setIsPriority(newIsPriority)
        localStorage.setItem(`card-${data.id}-priority`, newIsPriority)

        // Atualiza o novo valor o dado priority do banco de dados com true ou false.
        try {
            await api.post(`/priority/${data.id}`, {
                priority: newIsPriority
            })
        } catch (error) {
            console.log("Dados não atualizados", error);
        }

    }

    // Define as cores para o componente Card.
    useEffect(() => {
        if (isPriority) {
            setCorElemento("#ff6600")
        } else {
            setCorElemento('#fff')
        }
    }, [isPriority])


    // Recupera os dados no local storage
    useEffect(() => {
        const storedPriority = localStorage.getItem(`card-${data.id}-priority`)
        if (storedPriority) {
            setIsPriority(storedPriority === "true")
        }
    }, [data.id])

    // Deletar Nota
    const deleteNote = async () => {
        try {
            await api.delete(`/notes/${data.id}`)
            updateNote()
        } catch (error) {
            console.log("Erro ao deletar a nota:", error);
        }
    }

    // Atualizar Nota
    const handleUpDateNote = async () => {
        try {
            const updateData = {
                ...data,
                title: data.title,
                note: note
            }
            console.log(updateData);
            await api.post(`/priority/${data.id}`, updateData)
            updateNote()

        } catch (error) {
            console.log("Erro ao atualizar a nota:", error);
        }
    }

    // Atualiza o estado de note
    const handleNoteChange = (e) => {
        setNote(e.target.value)
    }



    return (
        <div className='card-info' id='card' style={{ border: `2px solid ${corElemento}` }}>
            <h3><strong>{data.title}</strong></h3>
            <div className='content'>
                <textarea
                    defaultValue={data.note}
                    onChange={handleNoteChange}
                >
                </textarea>
            </div>
            <div className='icons'>
                <div className='prioridade'>
                    <span><BsFillCheckCircleFill onClick={handleIconClick} /></span>
                    <p>Prioridade</p>
                </div>
                <span id='update'><FaCloudUploadAlt onClick={handleUpDateNote} /></span>
                <span id='trash'><FaTrashAlt onClick={deleteNote} /></span>

            </div>
        </div>
    )
}

export default Card;