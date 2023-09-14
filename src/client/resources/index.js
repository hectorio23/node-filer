// hectorio23
// This file contains all the events, actions, structures
// That the fronted needs for a well functionality 
"strict mode"; 

const buttonActiveMenu = document.querySelector('.menu__section');
const menuBar = document.getElementById('option-bar');
const mainBox = document.querySelector('.main');

buttonActiveMenu.addEventListener('click', e => {
    menuBar.style.left = "0";
}, false);

mainBox.addEventListener('click', e => {
    menuBar.style.left = "-40%";
}, false)

