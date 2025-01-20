"use strict";

// Importar las clases necesarias
import { DataExplorer } from "./dataExplorer.js"; // Asegúrate de que el archivo de la clase esté en la misma carpeta o ajusta la ruta

let breadcrumbState = ["All Documents"];
const breadcrumbContainer = document.querySelector(".breadcrump");
const tableContent = document.querySelector(".content");
let temporalElements; 

let temporal = {
    "All Documents": 
    [
        ["Pictures/", "/"],
        ["header.h", "file", "45 M", "444", "23/Nov/24", "noshared"]
    ],
    "Files": [],
    "Folders": [],
    "Recent": [],
    "Favorite Files": [],
    "Pictures": [
        ["Node Filer/", "/"],
    ],
    "Node Filer": [
        ["index.html", "file", "3 Kb", "644", "6/Jan/25", "noshared"],
    ]
}

// Función para actualizar la tabla en el DOM
const updateTable = (item, elementNode) => {
    
    // temporalElements ? temporalElements.forEach(element => element.removeEventListener("dblclick", () => {})): "" ;

    elementNode.innerHTML = ""; // Limpiar el contenido actual
    
    if (temporal[item].length == 0) {
        elementNode.innerHTML = `
            <div class="advice__content">
                <img src="resources/Logos/FileNotFound.webp" width="200px">
                <h3>Nothing here!</h3>
                <p>Sorry, You don't have files yet!</p>
            </div>`;
        return;
    }

    console.log(temporal[item])

    let tableContent = `
        <table class="table__content">
            <tr class="table__head title__table">
                <th class="name__head">Name</th>
                <th class="document__weight">Weight</th>
                <th class="document__permission">Permission</th>
                <th class="document__info">Last Modification</th>
                <th class="document__status">State</th>
            </tr>`;
    
    // Recorriendo los contenidos usando el método de DataExplorer
    temporal[item].forEach(element => {
            // Si es un directorio o archivo, lo mostramos
        if (element[1] === "/") {
            tableContent += `
                <tr class="table__head menu__items folder">
                    <td class="name__head">${element[0]}</td>
                    <td class="document__weight"></td>
                    <td class="document__permission"></td>
                    <td class="document__info"></td>
                    <td class="document__status"></td>
                </tr>`;
        }
        else if (element[1] === "file") {
            tableContent += `
                <tr class="table__head menu__items file">
                    <td class="name__head">${element[0]}</td>
                    <td class="document__weight">${(element[2]) ? element[2] : " "}</td>
                    <td class="document__permission">${element[3] || " "}</td>
                    <td class="document__info">${element[4]}</td>
                    <td class="document__status">${element[5]}</td>
                </tr>`;
        }
    })

    tableContent += "</table>";
    elementNode.innerHTML = tableContent;


    temporalElements = document.querySelectorAll(".folder");
    for (let items of temporalElements) {
        items.addEventListener("dblclick", () => {
            updateBreadcrumbs(items.childNodes[1].textContent.slice(0, -1))
            updateTable(items.childNodes[1].textContent.slice(0, -1), document.querySelector(".content"));

        })
    }

};

/**
* Update de BreadCrump menu based on the user 
* directory position.
*
* @param {itemName} string      Indicates the directory's name  
*
**/
const updateBreadcrumbs = (itemElement) => {
    /* It's simple, just add the actual Folder's name to the breadCrump array
    */
    itemElement ? breadcrumbState.push(itemElement): undefined;

    // Removes all the breadcrump menu's content
    breadcrumbContainer.innerHTML = ""; 


    const fragment = document.createDocumentFragment();
    let breadcrumbItem, breadcrumbSeparator;

    
    for (let elementNode of breadcrumbState) {
        breadcrumbItem = document.createElement("p");
        breadcrumbSeparator = document.createElement("p");

        breadcrumbItem.textContent = elementNode;
        breadcrumbSeparator.textContent = ">";
        
        breadcrumbItem.addEventListener("click", (item) => {

            breadcrumbState = breadcrumbState.slice(0, 
                breadcrumbState.indexOf(item.target.textContent) + 1
            );
            updateBreadcrumbs();
            updateTable(item.target.textContent, tableContent);
        })

        fragment.appendChild(breadcrumbItem);
        fragment.appendChild(breadcrumbSeparator)
    }

    breadcrumbContainer.appendChild(fragment);

};


// Inicialización de eventos en el DOM
document.addEventListener("DOMContentLoaded", () => {
    const optionsItems = document.querySelectorAll(".option__item");

    // Añadir eventos a las opciones
    optionsItems.forEach((option) => {
        option.addEventListener("click", (element) => {
            // Eliminar la clase seleccionada de todos los elementos
            optionsItems.forEach((item) =>
                item.classList.remove("element__selected")
            );
            // Agregar la clase seleccionada al elemento clickeado
            element.target.classList.add("element__selected");

            // Obtener el nombre del directorio de textContent
            const itemName = element.target;

            // Actualizar breadcrumbs y la tabla
            // breadcrumbState.pop()
            breadcrumbState.length = 0;
            updateBreadcrumbs(itemName.textContent);
            updateTable(itemName.textContent, tableContent);
        });
    });

    // Inicialización por defecto
    optionsItems[0].classList.add("element__selected");
    updateTable("All Documents", tableContent); // Mostrar el contenido de "All Documents" al cargar la página
});
