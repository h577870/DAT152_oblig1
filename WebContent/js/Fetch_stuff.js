"use strict"

import { Task } from "./Task.js"

export async function getStatuses_ajax() {
    let status_array = []
    const url = '../TaskServices/broker/allstatuses'
    try {
        const response = await fetch(url, { method: 'GET' })
        const data = await response.json()
        data.allstatuses.forEach(status => status_array.push(status))
    } catch (e) {
        console.warn(e.message)
    }
    return status_array
}

export async function getTasks_ajax() {
    const url = '../TaskServices/broker/tasklist'
    let task_array = []
    try {
        const response = await fetch(url, { method: 'GET' })
        const data = await response.json()
        data.tasks.forEach(task => {
            task_array.push(new Task(task.id, task.title, task.status))
        })
    } catch (e) {
        console.warn(e.message)
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
        console.warn(e.message)
    }
}

/*
Server error 500.
*/
export async function updateTask_ajax(json_obj, task_id) {
    try {
        const url = `../TaskServices/broker/task/${task_id}`
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(json_obj) //Er allerede en json-string, trengs da stringify()?
        })
        const data = await response.json()
        return data
    } catch (e) {
        console.warn(e.message)
    }
}