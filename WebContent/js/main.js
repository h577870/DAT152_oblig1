"use strict"

import { GuiHandler } from './GuiHandler.js'
import { getTasks_ajax, getStatuses_ajax } from './Fetch_stuff.js'

let tasks = []
let statuses = []
document.addEventListener('DOMContentLoaded', initContainer, true)

function initContainer() {
    return document.getElementsByClassName('taskcontainer')[0]
}

async function putStatuses() {
    statuses = await getStatuses_ajax()
    gui._allstatuses = statuses
}

async function putArray() {
    tasks = await getTasks_ajax()
    if (gui._noTask(tasks)) {
        console.info('Task list is empty...')
    }
    else {
        tasks.forEach(element => {
            gui._showTask(element)
        })
        gui._createParagraph(gui._container.getElementsByTagName('table')[0].rows.length - 1)
    }
}
// --- //
const container = initContainer()
const gui = new GuiHandler(container)
putStatuses()
putArray()