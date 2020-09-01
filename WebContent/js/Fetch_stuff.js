"use strict"

import { Task } from "./Task.js"

export async function showTasks(func) {
    const url = '../TaskServices/broker/tasklist'
    try {
        const response = await fetch(url, { method: 'GET' })
        try {
            const data = await response.json()
            data.tasks.forEach( task => {
				//javascript vet ikke før kjøretid at dette <KAN> være ett array, men det virker så lenge man vet selv
				//litt rart å passe funksjon som parameter, men ok =D
				const newTask = new Task(task.id, task.title, task.status)
				func(newTask)
			})
            
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