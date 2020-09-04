"use strict"

export class GuiHandler {

	/*
	* Properties 'allStatuses', 'deleteTaskCallback' og 'newStatusCallback'
	*/
	constructor(container) {
		this._allstatuses = []
		this._container = container
	}

	_showTask(task) {
		const tbl = this._container.getElementsByTagName('table')[0]
		const selector = document.createElement('select')
		const option_w = document.createElement('option')
		const option_e = document.createElement('option')
		const option_q = document.createElement('option')
		option_e.text = "bye"
		option_q.text = "nei"
		option_w.text = "hello"
		selector.add(option_w)
		selector.add(option_e)
		selector.add(option_q)
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
			let confirmation = window.confirm("Er du sikker på at du vil fjerne denne?")
			if (confirmation) {
				this._removeTask(row.dataset.row_id)
				console.log(`Task with id ${row.dataset.row_id} was removed from the task table.`)
			}
			else {
				console.log(`Task with id ${row.dataset.row_id} was not removed.`)
			}
		})

		selector.addEventListener('change', async () => {
			let selectorOption = selector.options[selector.selectedIndex].text
			this._update(row.dataset.row_id, selectorOption)
		})
	}
	_update(task, text) {
		let status = document.querySelector(`[data-row_id="${task}"]`)
		status.children[1].textContent = text
	}
	_removeTask(id) {
		let child = document.querySelector(`[data-row_id="${id}"]`)
		child.remove()
	}
	_noTask(tasks) {
		return tasks.length === 0
	}
	_deleteTaskCallback(response) { }

}