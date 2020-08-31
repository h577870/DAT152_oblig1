"use strict"

import { Task } from './Task.js'

let taskContainer = document.getElementsByClassName('taskcontainer')[0]

class GuiHandler {

	/*
	*Properties 'allStatuses', 'deleteTaskCallback' og 'newStatusCallback'
	*/

	//Prefix '_' i funksjonsnavn er for å markere at funksjonene er private.

	_showTask(task) {
		const tbl = taskContainer.getElementsByTagName('table')[0]

		const title = task._title
		const status = task._status
		const selector = document.createElement('select')
		const option_w = document.createElement('option')
		option_w.text = "hello"
		selector.add(option_w)
		const button = document.createElement('button')
		button.textContent = "knapp"

		const row = tbl.insertRow()
		row.dataset.row_id = task._id
		const td1 = row.insertCell(0)
		const td2 = row.insertCell(1)
		const td3 = row.insertCell(2)
		const td4 = row.insertCell(3)

		td1.appendChild(document.createTextNode(title))
		td2.appendChild(document.createTextNode(status))
		td3.appendChild(selector)
		td4.appendChild(button)

		button.addEventListener('click', async (e) => {
			this._removeTask(row.dataset.row_id)
			console.log(row.dataset.row_id)
		})


	}
	_update(task) {
		//TODO
	}
	_removeTask(id) {
		let child = document.querySelector(`[data-row_id="${id}"]`)
		child.parentNode.removeChild(child)
	}
	_noTask() {
		//TODO
	}

}
const task_list = [
	new Task(1, "Hello", 'ACTIVE'),
	new Task(2, 'Hade', 'WAITING'),
	new Task(3, 'Had', 'WAITING'),
	new Task(4, 'ade', 'WAITING'),
	new Task(5, 'Hde', 'WAITING')
]
const gui = new GuiHandler()
task_list.forEach(task => {
	gui._showTask(task)
})