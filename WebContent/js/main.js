"use strict"

import { GuiHandler } from './GuiHandler.js'
import { getTasks } from './Fetch_stuff.js'

let tasks = []
const statuses = [
    'ACTIVE',
    'WAITING',
    'DONE'
]
document.addEventListener('DOMContentLoaded', init, true)

function init() {
    return document.getElementsByClassName('taskcontainer')[0]
}
const container = init()
const gui = new GuiHandler(container)
gui._allstatuses = statuses

async function putArray() {
    tasks = await getTasks()
    if (gui._noTask(tasks)) {
        console.info('Task list is empty...')
    }
    else {
        tasks.forEach(element => {
            gui._showTask(element)
        })
    }
}
// --- //
putArray()