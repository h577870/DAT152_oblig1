"use strict"

export class Task {

	//Er det sånn man lager klasser? :P

	constructor(id, title, status) {
		this._id = id
		this._title = title
		this._status = status
	}

	get taskId() { return this.getTaskId }
	get taskTitle() { return this.getTaskTitle }
	get taskStatus() { return this.getTaskStatus }

	//Eclipse sutrer her...
	/**
     * @param {any} new_title
     */
	set taskTitle(new_title) { this.setTaskTitle(new_title) }

	//Her også...
	/**
     * @param {any} new_status
     */
	set taskStatus(new_status) { this.setTaskStatus(new_status) }
}