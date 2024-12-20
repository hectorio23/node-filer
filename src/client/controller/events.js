"use strict";

// Importar las clases necesarias
import { DataExplorer } from "./dataExplorer.js"; // Asegúrate de que el archivo de la clase esté en la misma carpeta o ajusta la ruta

// Crear las carpetas principales usando DataExplorer
const rootFolders = {
    "All Documents": new DataExplorer([
        ["29384665555555555", "/", "Desktop",
            [      
                ["29384r857857t5589", "file", "main.js", "19/11/24", "noshared", "664"],
                ["29384r857857t5589", "file", "functions.js", "19/11/24", "noshared", "654"],
                ["29384r857857t5589", "file", "events.js", "19/11/24", "noshared", "400"],

                ["845586u867877788", "/", "model", 
                    ["59866666667777784", "file", "query.js", "19/11/24", "noshared", "664"],
                    ["87444455476565473", "file", "fetchData.js", "19/11/24", "noshared", "654"],
                    ["93745756757675676", "file", "dataHandler.js", "19/11/24", "noshared", "400"]
                ]
            ]
        ],
        ["29384665555555555", "/", "Pictures",
            [      
                ["29384r857857t5589", "file", "baskground.png", "19/11/24", "noshared", "664"],
                ["29384r857857t5589", "file", "portrait.jpg", "19/11/24", "noshared", "654"],
                ["29384r857857t5589", "file", "birthday.mp4", "19/11/24", "noshared", "400"],

                ["845586u867877788", "/", "Wallpapers", 
                    ["59866666667777784", "file", "dynamicIsland.png", "19/11/24", "noshared", "664"],
                    ["87444455476565473", "file", "user.ico", "19/11/24", "noshared", "654"],
                    ["93745756757675676", "file", "hackerProfile.png", "19/11/24", "noshared", "400"]
                ]
            ]
        ]
    ]),
    "Files": new DataExplorer([]),
    "Folders": new DataExplorer([]),
    "Recent": new DataExplorer([]),
    "Favorite Files": new DataExplorer([]),
};

// Función para actualizar la tabla en el DOM
const updateTable = (item, elementNode) => {
    let contentFolder = rootFolders[item].data; // Obtener los datos de la carpeta correspondiente
    elementNode.innerHTML = ""; // Limpiar el contenido actual
    
    if (!contentFolder.length) {
        elementNode.innerHTML = `
            <div class="advice__content">
                <img src="resources/Logos/FileNotFound.webp" width="200px">
                <h3>Nothing here!</h3>
                <p>Sorry, You don't have files yet!</p>
            </div>`;
        return;
    }

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
    contentFolder.forEach(element => {
        console.log(element);2
        if (Array.isArray(element)) {
            // Si es un directorio o archivo, lo mostramos
            if (element[1] === "/") {
                tableContent += `
                    <tr class="table__head">
                        <td class="name__head">${element[2]}</td>
                        <td class="document__weight"></td>
                        <td class="document__permission"></td>
                        <td class="document__info"></td>
                        <td class="document__status"></td>
                    </tr>`;
            }
            else if (element[1] === "file") {
                tableContent += `
                    <tr class="table__head">
                        <td class="name__head">${element[2]}</td>
                        <td class="document__weight">${(element[4]) ? element[4] + " KB" : " "}</td>
                        <td class="document__permission">${element[5] || " "}</td>
                        <td class="document__info">${element[3]}</td>
                        <td class="document__status">${element[5]}</td>
                    </tr>`;
            }
        }
    });

    tableContent += "</table>";
    elementNode.innerHTML = tableContent;
};

// Función para actualizar el breadcrumbs en el DOM
const updateBreadcrumbs = (breadcrumbContainer, item, containerTable) => {
    breadcrumbContainer.innerHTML = ""; // Limpiar el contenedor
    const fragment = document.createDocumentFragment();
    const breadcrumbItem = document.createElement("p");
    const breadcrumbseparator = document.createElement("p");

    breadcrumbItem.textContent = item;
    breadcrumbseparator.textContent = ">";

    fragment.appendChild(breadcrumbItem);
    fragment.appendChild(breadcrumbseparator)

    breadcrumbContainer.appendChild(fragment);

    updateTable(item, containerTable); // Pasar el nombre de la carpeta al actualizar la tabla
};

// Inicialización de eventos en el DOM
document.addEventListener("DOMContentLoaded", () => {
    const optionsItems = document.querySelectorAll(".option__item");
    const breadcrumbContainer = document.querySelector(".breadcrump");
    const tableContent = document.querySelector(".content");

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
            const itemName = element.target.textContent;

            // Actualizar breadcrumbs y la tabla
            updateBreadcrumbs(breadcrumbContainer, itemName, tableContent);
        });
    });

    // Inicialización por defecto
    optionsItems[0].classList.add("element__selected");
    updateTable("All Documents", tableContent); // Mostrar el contenido de "All Documents" al cargar la página
});
