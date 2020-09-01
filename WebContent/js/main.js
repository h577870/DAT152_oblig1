"use strict"

import { GuiHandler } from './GuiHandler.js'
import { Task } from './Task.js'
import { showTasks } from './Fetch_stuff.js'

const statuses = [
    'ACTIVE',
    'WAITING',
    'DONE'
]

const gui = new GuiHandler()
gui._allstatuses = statuses

showTasks(gui._showTask)

console.info(`Task list is empty: ${gui._noTask()}`)