"use strict";

let indicator = false;


/////////////////////////////////////////////////////////
/////////// DOM ELEMENTS DECLARATION HERE! //////////////
/////////////////////////////////////////////////////////

const modeSelector = document.querySelector('.global__mode');
const modeIndicator = document.querySelector('.mode__indicator');
const tableItem = document.querySelectorAll(".table__item");
const tableRow = document.getElementsByTagName("TR");
const HTML = document.getElementsByTagName("HTML");
const contextMenu = document.querySelector(".modal__context-menu");

const changeIndicatorState = (element, oldToken, newToken ) => {
    if (element.target == modeSelector)  {
        element.target.classList.replace(oldToken, newToken);
        console.log("Hola");
        return undefined;
    }

    element.target.parentElement.classList.replace(oldToken, newToken);
}


///////////////////////////////////////////////////////
/////////////////////// EVENTS ZONE ///////////////////
//////////////////////////////////////////////////////

modeSelector.addEventListener("click", e => {
    console.log(e);
    if (!indicator) changeIndicatorState(e, "global__mode-toggle2", "global__mode-toggle1");
    else changeIndicatorState(e, "global__mode-toggle1", "global__mode-toggle2")

    indicator = !indicator;
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

