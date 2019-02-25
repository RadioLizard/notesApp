import moment from 'moment'
import { getFilters } from './filters'
import { sortNotes, getNotes } from './notes'

//Generate the DOM structure for a note
const generateNoteDom = (note) => {
    const itemDiv = document.createElement('a')
    const noteEl = document.createElement('p')
    const statusEl= document.createElement('p')


    //Setup note title text
    if (note.title.length > 0) {
        noteEl.textContent = note.title
    }
    else {
        noteEl.textContent = "Unnamed Note"
    }
    noteEl.classList.add('list-item__title')
    itemDiv.appendChild(noteEl)

    //Setup the link
    itemDiv.setAttribute('href', 'note.html#' + note.id)
    itemDiv.classList.add('list-item')

    //Setup the Status
    statusEl.textContent = `Last edited: ${moment(note.edited).fromNow()}`
    statusEl.classList.add('list-item__subtitle')
    itemDiv.appendChild(statusEl)
    
    return itemDiv 
}

//Render application notes
const renderNotes =  () => {
    const notesEl = document.querySelector('#notes')
    const filters = getFilters()
    const notes = sortNotes(filters.sortBy)
    const filteredNotes = notes.filter((note) => 
    note.title.toLowerCase().includes(filters.searchText.toLowerCase()))
    
    notesEl.innerHTML = ''

    if (filteredNotes.length >0){
        filteredNotes.forEach((note) => {
            const noteEl = generateNoteDom(note) //see notes-functions.js
            notesEl.appendChild(noteEl)
        })

    }
    else{
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = "You have no notes to show. Why not create one?"
        emptyMessage.classList.add("empty-message")
        notesEl.appendChild(emptyMessage)
    }
}

const initializeEditPage = (noteId) => {

    const titleEl = document.querySelector('#title')
    const bodyEl = document.querySelector('#body')
    const editedEl= document.querySelector('#lastEdited')
    const notes = getNotes()
    const note = notes.find((note) =>  note.id === noteId)


if (!note) {
    location.assign('/index.html')
}

titleEl.value = note.title
bodyEl.value = note.body
editedEl.textContent = `Last edited: ${moment(note.edited).fromNow()}`

}
//Assign the last edited time
const generateLastEdited = (timestamp) => {
    return `Last edited: ${moment(timestamp).fromNow()}`
}

export {generateNoteDom, renderNotes, generateLastEdited, initializeEditPage}