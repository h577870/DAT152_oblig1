"use strict"

const modal = document.getElementById("modal")

const button = document.getElementById("newTask")

const span = document.getElementsByClassName("close")[0]

button.onclick = function() {
    modal.style.display = "none"
}

span.onclick = function (){
    modal.style.display = "none"
}

window.onclick = function(event){
    if (event.target == modal){
        modal.style.display = "none"
    }
}
