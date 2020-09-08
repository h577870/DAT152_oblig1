"use strict"

import { GuiHandler } from './GuiHandler.js'
import { deleteTask_ajax, getStatuses_ajax, getTasks_ajax } from './fetch.js'

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

gui.ondeleteCallback = async (task) => {

    let confirmation_delete = window.confirm("Er du sikker på at du vil fjerne denne?")
			if (confirmation_delete) {
                
                const data = await deleteTask_ajax(task)
                if (data.responseStatus) {
                    console.info(`Task with id ${task._id} was successfully removed from server...`)
                    gui._removeTask(task._id)
                }

				gui._updateParagraph(gui._container.getElementsByTagName('table')[0].rows.length - 2)
			}
			else {
				console.info(`Task with id ${task._id} was not removed.`)
			}
}
