"use strict"

import { Task } from "./Task.js"

export async function showTasks(func) {
    const url = '../TaskServices/broker/tasklist'
    try {
        const response = await fetch(url, { method: 'GET' })
        try {
            const data = await response.json()
            for (let task in data.tasks) {
                let task_1 = new Task(task.id, task.title, task.status) //undefined?
                console.log(task_1)
                func(task_1)
            }
        } catch (e) { console.log(e.message) }
    } catch (e) {
        console.log(e.message)
    }

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