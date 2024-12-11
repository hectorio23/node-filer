"use strict";


let rootContent = {
    "All Documents": [],
    "Files": [],
    "Folders": {
        "Documents/": ["resume.pdf", "project.docx"],
        "Images/": ["photo1.jpg", "photo2.png"],
        "Videos/": ["video1.mp4"],
        "Archives/": ["old.zip", "backup.tar.gz"]
    },
    "Recent": [],
    "Favorite Files": []
};

// Loop to print keys



const getElements = (arrayElement) => {
    let temp = [];

    for (let key in arrayElement) {
        if (arrayElement.hasOwnProperty(key)) {
            if (/\/$/.test(arrayElement[key])) {
                // Si es un directorio, agregamos solo el nombre del directorio
                temp.push(key); // El nombre del directorio
            } else {
                // Si es un archivo, agregamos solo el nombre del archivo
                temp.push(arrayElement[key]); // El nombre del archivo
            }
        }
    }

    return temp;
}


// Función para recopilar todos los archivos y carpetas
function updateFilesAndDocuments(root) {
    let allFiles = [];
    let allDocuments = [];

    for (let folder in root["Folders"]) {
        const folderContent = root["Folders"][folder];
        allFiles = allFiles.concat(folderContent);
        allDocuments.push(folder); // Incluir la carpeta
        allDocuments = allDocuments.concat(folderContent); // Incluir su contenido
    }

    root["Files"] = allFiles.filter(file => !/\/$/.test(file)); // Solo archivos
    root["All Documents"] = allDocuments; // Todo (archivos y carpetas)
}

// Función para actualizar "Recent" usando una pila de 10 elementos
function addToRecent(root, file) {
    if (root["Recent"].includes(file)) {
        root["Recent"] = root["Recent"].filter(item => item !== file);
    }
    root["Recent"].push(file);
    if (root["Recent"].length > 10) {
        root["Recent"].shift(); // Eliminar el más antiguo
    }
}

// Función para marcar un archivo como favorito
function addToFavorites(root, file) {
    if (!root["Favorite Files"].includes(file)) {
        root["Favorite Files"].push(file);
    }
}

// Función para quitar un archivo de favoritos
function removeFromFavorites(root, file) {
    root["Favorite Files"] = root["Favorite Files"].filter(item => item !== file);
}

// Ejemplo de uso
updateFilesAndDocuments(rootContent);
addToRecent(rootContent, "resume.pdf");
addToRecent(rootContent, "photo1.jpg");
addToFavorites(rootContent, "photo1.jpg");


addEventListener("DOMContentLoaded", () => {

    ////////////////////////////////////////
    ////////////// FUNCTIONS ///////////////
    ///////////////////////////////////////
    const changeState = (newElement, arrayElements) => {
        for (let currentElement of arrayElements) {
            currentElement.classList.remove("element__selected");
        }
        newElement.classList.add("element__selected");
    }

    // const breadcrumpUpdate = (element) => {
    //     
    // }
    ///////////////////////////////////////77
    ///////////// EVENTS /////////////////version
    ////////////////////////////////////


    const optionsItems = document.querySelectorAll(".option__item");
    // const optionsItems = docuement.querySelectorAll(".option__item");
    const breadcrumpItems = document.querySelector(".breadcrump");
    
    changeState(optionsItems[0] , optionsItems)

for (let elements of optionsItems) {
    elements.addEventListener("click", (item) => {
        changeState(item.target, optionsItems);
        let data;
        // breadcrumpUpdate(item.target);
        if (item.target.textContent != "All Files")  {  data = getElements(rootContent[`${ item.target.textContent }`]); }
        else { data = rootContent["All Documents"]; }

        console.log(data);
    })
}

});

