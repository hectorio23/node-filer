"use strict";

let indicator = 0;

const modeSelector = document.querySelector('.global__mode');
const tableItem = document.querySelectorAll(".table__item");
const tableRow = document.getElementsByTagName("TR");
const HTML = document.getElementsByTagName("HTML");
const contextMenu = document.querySelector(".modal__context-menu");


modeSelector.addEventListener("click", e => {
    if (indicator == 0) {
        e.target.classList.replace("global__mode-toggle2", "global__mode-toggle1"); 
        indicator = 1;
    }
    else {
        e.target.classList.replace("global__mode-toggle1", "global__mode-toggle2"); 
        indicator = 0;
    }
}, true);


for (let element of tableItem) {
    element.addEventListener("contextmenu", e => {
        e.preventDefault()
        contextMenu.style.display = "block";
        contextMenu.style.left = `${ e.clientX }px`;
        contextMenu.style.top = `${ e.clientY }px`;

    }, false);
}

for (let row of tableRow) {
    row.addEventListener("dragenter", e => {
        e.preventDefault()
        e.target.parentElement.classList.add("toggle__color");
    }, false);
    

    row.addEventListener("dragleave", e => {
        e.preventDefault()
        e.target.parentElement.classList.remove("toggle__color");
    }, false);

    row.addEventListener("drop", e => {
        e.preventDefault();
        e.target.parentElement.classList.remove("toggle__color");
    })

}

