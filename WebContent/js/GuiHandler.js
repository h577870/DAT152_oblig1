"use strict"

import { deleteTask_ajax, updateTask_ajax } from "./fetch.js"

export class GuiHandler {

	constructor(container) {
		this._allstatuses = []
		this._container = container
	}

	_showTask(task) {
		const tbl = this._container.getElementsByTagName('table')[0]
		const selector = this._createSelector()
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
			let confirmation_delete = window.confirm("Er du sikker på at du vil fjerne denne?")
			if (confirmation_delete) {
				this._deleteTaskCallback(task)
				this._updateParagraph(this._container.getElementsByTagName('table')[0].rows.length - 2)
			}
			else {
				console.info(`Task with id ${task._id} was not removed.`)
			}
		})
		selector.addEventListener('change', async () => {
			let confirmation_update = window.confirm("Er du sikker på at du vil oppdatere statusen?")
			if (confirmation_update) {
				let selectorOption = selector.options[selector.selectedIndex].text
				this._newStatusCallback(task._id, selectorOption)
			} else {
				console.info(`Status on task ${task._id} was not updated in view...`)
			}
		})
	}
	_update(task_id, newStatus) {
		let status = document.querySelector(`[data-row_id="${task_id}"]`)
		console.info(`Task with id ${task_id} was successfully updated in view...`)
		status.children[1].textContent = newStatus
	}
	_removeTask(id) {
		let child = document.querySelector(`[data-row_id="${id}"]`)
		console.info(`Task with id ${id} was successfully removed from view...`)
		child.remove()
	}
	_noTask(tasks) {
		return tasks.length === 0
	}
	async _deleteTaskCallback(task) {
		//TODO: Skal egentlig sende task-id i parameter, må endres.
		const data = await deleteTask_ajax(task)
		if (data.responseStatus) {
			console.info(`Task with id ${task._id} was successfully removed from server...`)
			this._removeTask(task._id)
		}
	}

	async _newStatusCallback(task_id, newStatus) {
		const data = await updateTask_ajax(newStatus, task_id)
		if (data.responseStatus) { //Sjekke denne
			console.info(`Task with id ${task_id} was successfully updated on server...`)
			this._update(task_id, newStatus)
		}
	}
	//Lager paragraf ved lasting. Mulig å slå sammen til én metode?
	_createParagraph(table_length) {
		const paragraph_class = this._container.getElementsByClassName('paragraphcontainer')[0]
		const paragraph = document.createElement('p')
		paragraph.textContent = `Found ${table_length} tasks...`
		paragraph_class.appendChild(paragraph)
	}

	//Oppdaterer eksisterende paragraf.
	_updateParagraph(table_length) {
		const paragraph_class = this._container.getElementsByClassName('paragraphcontainer')[0]
		const paragraph = paragraph_class.getElementsByTagName('p')[0]
		paragraph.textContent = `Found ${table_length} tasks...`
	}

	_createSelector() {
		const selector = document.createElement('select')
		const option_w = document.createElement('option')
		const option_e = document.createElement('option')
		const option_q = document.createElement('option')

		const starter_option = document.createElement('option')
		starter_option.text = '<Modify>'
		starter_option.selected = true
		starter_option.hidden = true

		option_e.text = this._allstatuses[0]
		option_q.text = this._allstatuses[1]
		option_w.text = this._allstatuses[2]
		selector.add(starter_option)
		selector.add(option_w)
		selector.add(option_e)
		selector.add(option_q)
		return selector
	}

}