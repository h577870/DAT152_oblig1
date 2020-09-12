"use strict"

import { Task } from "./Task.js"

export class TaskService {

    async getStatuses_ajax() {
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

    async getTasks_ajax() {
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

    async deleteTask_ajax(id) {
        try {
            const url = `../TaskServices/broker/task/${id}`
            const response = await fetch(url,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    body: JSON.stringify(id)
                }
            )
            const data = await response.json()
            return data
        }
        catch (e) {
            console.warn(e.message)
        }
    }

    async updateTask_ajax(task_id, newstatus) {
        try {
            const url = `../TaskServices/broker/task/${task_id}`
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify({
                    status: newstatus
                })
            })
            const data = await response.json()
            return data
        } catch (e) {
            console.warn(e.message)
        }
    }

    async addTask_ajax(task) {
        try {
            const url = '../TaskServices/broker/task'
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(task)
            })
            const data = await response.json()
            console.log(data)
            return data
        } catch (e) {
            console.log(e.message)
        }
    }
}