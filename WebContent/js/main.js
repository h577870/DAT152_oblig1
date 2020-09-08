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
        gui._tasks.forEach(element => {
            gui._showTask(element)
        })
        gui._createParagraph(gui._container.getElementsByTagName('table')[0].rows.length - 1)
    }
}

//id = [object MouseEvent] :P
//Funker hvis jeg legger inn id manuelt
gui.deleteTaskCallback = async (id) => {
    try {
        const response = await taskservice.deleteTask_ajax(2)
        console.log(response)
        if (true) {
            console.info(`Removed task with id ${id}`)
            gui._removeTask(2)
            gui._updateParagraph(gui._container.getElementsByTagName('table')[0].rows.length - 1)
        }
    } catch (e) { console.warn(e.message) }

}

init()