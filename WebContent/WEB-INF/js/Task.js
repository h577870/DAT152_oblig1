"use strict"

export class Task {

	//Er det sånn man lager klasser? :P

	constructor(id, title, status) {
		this._id = id
		this._title = title
		this._status = status
	}

	get taskId() { return this._id }
	get taskTitle() { return this._title }
	get taskStatus() { return this._status }

	set taskTitle(title) { this._title = title }
	set taskStatus(status) { this._status = status }
}