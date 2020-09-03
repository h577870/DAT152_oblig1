"use strict"

import { Task } from "./Task.js"

export async function getTasks() {
    const url = '../TaskServices/broker/tasklist'
    let task_array = []
    try {
        const response = await fetch(url, { method: 'GET' })
        try {
            const data = await response.json()
            data.tasks.forEach(task => {
                //javascript vet ikke før kjøretid at dette <KAN> være ett array, men det virker så lenge man vet selv
                //Endret slik at denne returnerer array av tasks, ettersom guiHandler ikke skal ha kobling med fetch-metoder.
                task_array.push(new Task(task.id, task.title, task.status))
            })
        } catch (e) { console.log(e.message) }
    } catch (e) {
        console.log(e.message)
    }
    return task_array
}

//ikke ferdig...
export async function deleteTask(callback, task) {
    try {
        const url = `../TaskServices/broker/task/${task._id}`
        const response = await fetch(url,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }
        )
        try {
            const data = await response.json()
            callback(data)
        } catch (e) { console.log(e.message) }
    }
    catch (e) {
        console.log(e.message)
    }
}