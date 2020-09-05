"use strict"

import { Task } from "./Task.js"

export async function getTasks_ajax() {
    const url = '../TaskServices/broker/tasklist'
    let task_array = []
    try {
        const response = await fetch(url, { method: 'GET' })
        const data = await response.json()
        data.tasks.forEach(task => {
            //javascript vet ikke før kjøretid at dette <KAN> være ett array, men det virker så lenge man vet selv
            //Endret slik at denne returnerer array av tasks, ettersom guiHandler ikke skal ha kobling med fetch-metoder.
            task_array.push(new Task(task.id, task.title, task.status))
        })
    } catch (e) {
        console.log(e.message)
    }
    return task_array
}

export async function deleteTask_ajax(task) {
    try {
        const url = `../TaskServices/broker/task/${task._id}`
        const response = await fetch(url,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(task)
            }
        )
        const data = await response.json()
        return data
    }
    catch (e) {
        console.log(e.message)
    }
}