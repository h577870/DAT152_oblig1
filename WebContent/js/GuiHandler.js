"use strict"

export class GuiHandler {

	constructor() {
		this._allstatuses = []
		this._tasks = []
	}

	set allstatuses(newstatuses) {
		this._allstatuses = newstatuses
	}
	set tasks(tasks) {
		this._tasks = tasks
	}
	set container(taskcontainer) {
		this._container = taskcontainer
	}
	/**
	 * @param {(id: any) => Promise<void>} callback
	 */
	set deleteTaskCallback(callback) {
		this._deleteTaskCallback = callback
	}
	/**
	 * @param {{ (arg0: any, arg1: any): void; (id: any, status: any): Promise<void>; }} callback
	 */
	set newStatusCallback(callback) {
		this._newStatusCallback = callback
	}

	_showTask(task) {
		const tbl = this._container.getElementsByTagName('table')[0]
		const selector = this._createSelector(task)
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

		//selectorOption = selector.options[selector.selectedIndex].text

		button.addEventListener('click', this.deleteClick)
		selector.addEventListener('change', this.updateChange)
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
	_noTask() {
		return this._tasks.length === 0
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

	_createSelector(task) {
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
		let option_array = selector.getElementsByTagName('option')
		let inputlist = Array.prototype.slice.call(option_array)
		inputlist.forEach(a => {
			if (task._status === a.text) {
				a.disabled = true
			}
		})
		return selector
	}

	deleteClick = (id) => {
		let confirmation_delete = window.confirm("Er du sikker på at du vil fjerne denne?")
		if (confirmation_delete) {
			this._deleteTaskCallback(id)
		}
		else {
			console.info(`Task with id ${id} was not removed.`)
		}
	}

	updateChange = (id, status) => {
		let confirmation_update = window.confirm("Er du sikker på at du vil oppdatere statusen?")
		if (confirmation_update) {
			this._newStatusCallback(id, status)
		} else {
			console.info(`Status on task ${id} was not updated in view...`)
		}
	}

}