"use strict"

import { Task } from './Task.js'

export class TaskBox {

    constructor() {

        this._modalSpan = document.getElementsByClassName('close')[0]
        this._modalSpan.addEventListener('click', () => {
            this.close()
        }, true)
        this._addButton = document.querySelector(`[data-submitID="submit"]`)
        this._addButton.addEventListener('click', () => {
            this.submit()
        }, true)

        this._onsubmit = () => { console.log("haha") }

    }

    show() {
        let modal = document.querySelector(`[data-modalID="myModal"]`)
        modal.style.display = 'block'
    }

    close() {
        let modal = document.querySelector(`[data-modalID="myModal"]`)
        modal.style.display = "none"
    }

    set onsubmit(onsubmitFunction) {
        this._onsubmit = onsubmitFunction
    }

    submit() {
        let title = document.querySelector(`[data-titleID="title"]`).value
        let status = document.querySelector(`[data-statusID="status"]`).value

        this._onsubmit(new Task(0, title, status.toUpperCase()))
    }



}