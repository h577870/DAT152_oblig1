"use strict"

import {GuiHandler} from './GuiHandler.js'
import {Task} from './Task.js'

// Henter modal
const modal = document.querySelector(`[data-modalID="myModal"]`)
// Henter kanppen som opner modal
const button = document.querySelector(`[data-buttonID="newTask"]`)
// Henter span elementet som lukker modalen
const span = document.getElementsByClassName("close")[0]

const title = document.querySelector(`[data-titleID = "title"]`)
const status = document.querySelector(`[data-statusID ="status"]`)


//Henter submitknappen
const submit = document.querySelector(`[data-submitID ="submit"]`)

// Opner modalen når man trykker på knappen
button.addEventListener('click', async() => {
    modal.style.display = "block" 
})

//Lukker modalen når man trykker på (x)
span.addEventListener('click', async() => {
    modal.style.display = "none"
})

// Når man trykker utenfor modalen, lukker vinduet seg
window.addEventListener('click', async(event) => {
    if (event.target == modal){
        modal.style.display = "none"
    }
})

//Legge til task i tabellen (ikke ferdig)
const gui = new GuiHandler()

const task = new Task(6, title.value, status.value)
submit.addEventListener('click', async() => {
    gui._showTask(task)
})


