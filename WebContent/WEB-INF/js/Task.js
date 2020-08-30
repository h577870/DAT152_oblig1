"use strict"

class Task {
	
	//Er det sånn man lager klasser? :P
	
	constructor(id, title, status) {
		let task_id = id
		let task_title = title
		let task_status = status
		
		this.getTaskId = () => { return task_id }
		this.getTaskTitle = () => { return task_title }
		this.getTaskStatus = () => { return task_status }
	
		this.setTaskTitle = (title) => { task_title = title }
		this.setTaskStatus = (status) => { task_status = status }
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