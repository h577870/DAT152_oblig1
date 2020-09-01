"use strict"

import { Task } from './Task.js'

const taskContainer = document.getElementsByClassName('taskcontainer')[0]
const tbl = taskContainer.getElementsByTagName('table')[0]

export class GuiHandler {

	constructor() {
		this._allstatuses = []
	}

	/*
	*Properties 'allStatuses', 'deleteTaskCallback' og 'newStatusCallback'
	*/

	//Prefix '_' i funksjonsnavn er for å markere at funksjonene er private.

	_showTask(task) {

		const selector = document.createElement('select')
		const option_w = document.createElement('option')
		option_w.text = "hello"
		selector.add(option_w)
		const button = document.createElement('button')
		button.textContent = "REMOVE"

		const row = tbl.insertRow()
		row.dataset.row_id = task._id
		const td1 = row.insertCell(0)
		const td2 = row.insertCell(1)
		const td3 = row.insertCell(2)
		const td4 = row.insertCell(3)

		td1.appendChild(document.createTextNode(task._title))
		td2.appendChild(document.createTextNode(task._status))
		td3.appendChild(selector)
		td4.appendChild(button)

		button.addEventListener('click', async () => {
			this._removeTask(row.dataset.row_id)
			console.log(row.dataset.row_id)
		})


	}
	_update(task) {
		//TODO
	}
	_removeTask(id) {
		let child = document.querySelector(`[data-row_id="${id}"]`)
		child.remove()
		console.log(`Task with id ${id} was removed from the task table.`)
	}
	_noTask() {
		//TODO
	}

}