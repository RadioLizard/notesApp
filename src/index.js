'use strict'

import { createNote } from './notes'
import { setFilters } from './filters'
import { renderNotes } from './views'

renderNotes()

document.querySelector('#create').addEventListener('click', (e) => {
    const id = createNote()
    location.assign('/note.html#'+id)
})


document.querySelector('#search').addEventListener('input' , (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderNotes()
})

document.querySelector('#filter').addEventListener('change', (e) => {
    setFilters({
        sortBy: e.target.value
    })
    renderNotes()
})

window.addEventListener('storage',  (e) => {
    if (e.key === 'notes') {  
        renderNotes()
    }
})
