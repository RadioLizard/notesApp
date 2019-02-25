import uuidv4 from 'uuid/v4'
import moment from 'moment'

let notes = []

//Read existing notes from local storage
let loadNotes = () => {
    const notesJSON = localStorage.getItem('notes')
    
    try{
        return notesJSON ? JSON.parse(notesJSON) : []
    }
    catch(e){
        return []
    }
 }

//save notes
const saveNotes = () => {
    localStorage.setItem('notes', JSON.stringify(notes))
}
//Expose notes from module
const getNotes = () => notes

//Code for creating a note
const createNote = () => {
    let newId= uuidv4()
    let timestamp = moment().valueOf()
    notes.push({
        id: newId,
        title: 'Unnamed Note',
        body: '',
        created: timestamp,
        edited: timestamp
    })
    saveNotes()
    return newId
}

//remove a note
const removeNote =  (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id)

    if (noteIndex > -1){
        notes.splice(noteIndex, 1)
        saveNotes()
    }
}

const sortNotes = (sortBy) => {
    if (sortBy === 'edited'){
        return notes.sort((a, b) => {
            if(a.edited > b.edited){
                return -1
            }
            else if (a.edited < b.edited){
                return 1
            }
            else{
                return 0
            }
        })
    }
    else if (sortBy === 'created') {
        return notes.sort((a, b) => {
            if (a.created > b.created){
                return -1
            }
            else if (a.created < b.created){
                return 1
            }
            else {
                return 0
            }
        })
    }
   else if (sortBy === 'alphabet'){
       return notes.sort((a, b) => {
           if (a.title.toLowerCase() < b.title.toLowerCase()){
               return -1
           }
           else if (a.title.toLowerCase() > b.title.toLowerCase()){
               return 1
           }
           else{
               return 0
           }
       })
   }
   else{
       return notes
   }
}

const updateNote = (id, updates) => {
    const note = notes.find((note)=> note.id === id)
    if (!note){
        return
    }
    if (typeof updates.title === 'string'){
        note.title = updates.title
        note.edited = moment().valueOf()
    }
    if (typeof updates.body === 'string'){
        note.body = updates.body
        note.edited = moment().valueOf()
    }
    saveNotes()
    return note
}

notes = loadNotes()

export {getNotes, createNote, removeNote, sortNotes, updateNote}