'use strict'
import{initializeEditPage, generateLastEdited} from './views'
import{updateNote, removeNote} from './notes'

const titleEl = document.querySelector('#title')
const bodyEl = document.querySelector('#body')
const editedEl= document.querySelector('#lastEdited')
const removeEl = document.querySelector('#remove')
const noteId = location.hash.substring(1)

initializeEditPage(noteId)

titleEl.addEventListener('input', (e) =>{
    const note = updateNote(noteId, {
        title: e.target.value
    })
    editedEl.textContent = generateLastEdited(note.edited)
})

bodyEl.addEventListener('input', (e) => {
   const note = updateNote(noteId, {
        body: e.target.value
    })
    editedEl.textContent = generateLastEdited(note.edited)
})

document.querySelector('#remove').addEventListener('click', (e) => {
    removeNote(noteId)
    location.assign('./index.html')
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes'){
        initializeEditPage(noteId)
    }
})

