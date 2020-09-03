"use strict"

import { GuiHandler } from './GuiHandler.js'
import { getTasks } from './Fetch_stuff.js'

let tasks = []

const statuses = [
    'ACTIVE',
    'WAITING',
    'DONE'
]
const gui = new GuiHandler()
gui._allstatuses = statuses

async function putArray() {
    tasks = await getTasks()
    tasks.forEach(element => {
        gui._showTask(element)
    })
}
// --- //
console.info(`Task list is empty: ${gui._noTask()}`)
putArray()