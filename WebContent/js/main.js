"use strict"

import { GuiHandler } from './GuiHandler.js'
import { TaskService } from './fetch.js'

let gui = new GuiHandler()
let taskservice = new TaskService()

async function init() {
    gui.container = document.getElementsByClassName('taskcontainer')[0]
    gui.allstatuses = await taskservice.getStatuses_ajax()
    gui.tasks = await taskservice.getTasks_ajax()
    if (gui._noTask()) {
        console.info('Task list is empty...')
    }
    else {
        gui.tasks.forEach(element => {
            gui._showTask(element)
        })
        gui._createParagraph(gui._container.getElementsByTagName('table')[0].rows.length - 1)
    }
}
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

init()