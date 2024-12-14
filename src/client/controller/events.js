"use strict";

// Importar las clases y funciones
import { Document } from "./documents.js";
import { Folder } from "./folders.js";
import {
    getDocumentByHash,
    getFoldersInFolder,
    getAllContentsFromAllFolders,
    getContentsByFolderHash,
} from "./functions.js";

// Crear las carpetas principales
const rootFolders = {
    "All Documents": new Folder("All Documents"),
    "Files": new Folder("Files"),
    "Folders": new Folder("Folders"),
    "Recent": new Folder("Recent"),
    "Favorite Files": new Folder("Favorite Files"),
};

// Crear subcarpetas dentro de "Folders"
const documentsFolder = new Folder("Documents");
const imagesFolder = new Folder("Images");
const videosFolder = new Folder("Videos");
const archivesFolder = new Folder("Archives");

rootFolders.Folders.addItem(documentsFolder);
rootFolders.Files.addItem(imagesFolder);
rootFolders.Folders.addItem(videosFolder);
rootFolders.Folders.addItem(archivesFolder);

// Agregar documentos a las carpetas
documentsFolder.addItem(
    new Document("resume.pdf", 3.4, "rw-r--r--", "28 - Sep - 2018", "active", "user")
);
documentsFolder.addItem(
    new Document("project.docx", 2.1, "rw-r--r--",  "28 - Sep - 2018", "active", "user")
);

rootFolders.Files.addItem(
    new Document("photo1.jpg", 5.2, "r--r--r--",  "28 - Sep - 2018", "archived", "user")
);
imagesFolder.addItem(
    new Document("photo2.png", 3.7, "r--r--r--",  "28 - Sep - 2018", "archived", "user")
);

videosFolder.addItem(
    new Document("video1.mp4", 15.0, "r--r--r--",  "28 - Sep - 2018", "active", "user")
);

archivesFolder.addItem(
    new Document("old.zip", 8.4, "rw-r--r--",  "28 - Sep - 2018", "archived", "user")
);
archivesFolder.addItem(
    new Document(
        "backup.tar.gz",
        12.5,
        "rw-r--r--",
        new Date(),
        "archived",
        "user"
    )
);

// Función para actualizar la tabla en el DOM
const updateTable = (folderHash, elementNode, item) => {
    
    let contentFolder = getContentsByFolderHash(folderHash, rootFolders[`${ item }`]);

    if (!contentFolder) {
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
    
    for (let element of getContentsByFolderHash(
        folderHash,
        rootFolders[`${ item }`]
    )) {
        console.log(element)
        tableContent += `
            <tr class="table__head">
                <td class="name__head">${element.name }</td>
                <td class="document__weight">${(element.weight)? element.weight + " MB": " " }</td>
                <td class="document__permission">${
                    element.permission || " "
                }</td>
                <td class="document__info">${
                    element.lastModification || " "
                }</td>
                <td class="document__status">${ element.state || " "}</td>
            </tr>`;
    }

    tableContent += "</table>";
    elementNode.innerHTML = tableContent;
};

// Función para actualizar el breadcrumbs en el DOM
const updateBreadcrumbs = (folderHash, breadcrumbContainer, item, containerTable) => {
    breadcrumbContainer.innerHTML = ""; // Limpiar el contenedor
    // const folder = getFoldersInFolder(folderHash, rootFolders[`${ item }`])[0];
    
    const fragment = document.createDocumentFragment();
    const breadcrumbItem = document.createElement("p");
    const breadcrumbseparator = document.createElement("p");

    breadcrumbItem.textContent = item;
    breadcrumbseparator.textContent = ">";


    fragment.appendChild(breadcrumbItem);
    fragment.appendChild(breadcrumbseparator)

    breadcrumbContainer.appendChild(fragment);

    updateTable(folderHash, containerTable,  item)

};

// Inicialización de eventos en el DOM
document.addEventListener("DOMContentLoaded", () => {
    
    const optionsItems = document.querySelectorAll(".option__item");
    const breadcrumbContainer = document.querySelector(".breadcrump");
    const tableContent = document.querySelector(".content");
    let keysValue = Object.keys(rootFolders)
    
    for (let elementNode = 0; elementNode < optionsItems.length; elementNode++) {
        optionsItems[elementNode].setAttribute("data-hash", rootFolders[keysValue[elementNode]].hash);
        // menuOptions[elementNode].setAttribute("data-hash", rootFolders[0]);
    }


    // Seleccionar el primer elemento por defecto
    optionsItems[0].classList.add("element__selected");
    console.log(rootFolders["All Documents"].getContents());
    updateTable(rootFolders["All Documents"].hash, tableContent, "All Documents");

    // Añadir eventos a las opciones
    optionsItems.forEach((option) => {
        option.addEventListener("click", (element) => {
            optionsItems.forEach((item) =>
                item.classList.remove("element__selected")
            );
            element.target.classList.add("element__selected");

            const folderHash = element.target.getAttribute("data-hash");
            updateBreadcrumbs(folderHash, breadcrumbContainer, element.target.textContent, tableContent);
            updateTable(folderHash, tableContent, element.target.textContent);
        });
    });
});
