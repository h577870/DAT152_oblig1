"use strict"

import { GuiHandler } from './GuiHandler.js'
import { Task } from './Task.js'

const statuses = [
    'ACTIVE',
    'WAITING',
    'DONE'
]

const gui = new GuiHandler()
gui._allstatuses = statuses

const task_list = [
    new Task(1, "Hello", 'ACTIVE'),
    new Task(2, 'Hade', 'WAITING'),
    new Task(3, 'Had', 'WAITING'),
    new Task(4, 'ade', 'WAITING'),
    new Task(5, 'Hde', 'WAITING')
]

task_list.forEach(task => {
    gui._showTask(task)
})