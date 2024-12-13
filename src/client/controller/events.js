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
rootFolders.Folders.addItem(imagesFolder);
rootFolders.Folders.addItem(videosFolder);
rootFolders.Folders.addItem(archivesFolder);

// Agregar documentos a las carpetas
documentsFolder.addItem(
    new Document("resume.pdf", 3.4, "rw-r--r--", new Date(), "active", "user")
);
documentsFolder.addItem(
    new Document("project.docx", 2.1, "rw-r--r--", new Date(), "active", "user")
);

imagesFolder.addItem(
    new Document("photo1.jpg", 5.2, "r--r--r--", new Date(), "archived", "user")
);
imagesFolder.addItem(
    new Document("photo2.png", 3.7, "r--r--r--", new Date(), "archived", "user")
);

videosFolder.addItem(
    new Document("video1.mp4", 15.0, "r--r--r--", new Date(), "active", "user")
);

archivesFolder.addItem(
    new Document("old.zip", 8.4, "rw-r--r--", new Date(), "archived", "user")
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
  
        console.log( rootFolders[`${ item }`])
    const folder = getFoldersInFolder(folderHash, rootFolders[`${ item }`])[0];
    console.log(folder + " imprimiendo el valor de folder") 


    if (!folder) {
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

    for (let item of getContentsByFolderHash(
        folderHash,
        rootFolders["All Documents"]
    )) {
        tableContent += `
            <tr class="table__head">
                <td class="name__head">${item.name}</td>
                <td class="document__weight">${item.weight || "N/A"} MB</td>
                <td class="document__permission">${
                    item.permission || "N/A"
                }</td>
                <td class="document__info">${
                    item.lastModification || "N/A"
                }</td>
                <td class="document__status">${item.state || "N/A"}</td>
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
    const menuOptions = document.querySelectorAll(".option__item");
    let keysValue = Object.keys(rootFolders)
    
    for (let elementNode = 0; elementNode < menuOptions.length; elementNode++) {
        menuOptions[elementNode].setAttribute("data-hash", rootFolders[keysValue[elementNode]].hash);
        // menuOptions[elementNode].setAttribute("data-hash", rootFolders[0]);
    }

    const optionsItems = document.querySelectorAll(".option__item");
    const breadcrumbContainer = document.querySelector(".breadcrump");
    const tableContent = document.querySelector(".content");

    // Seleccionar el primer elemento por defecto
    optionsItems[0].classList.add("element__selected");
    updateTable(rootFolders["All Documents"].hash, tableContent, "All Documents");

    // Añadir eventos a las opciones
    optionsItems.forEach((option) => {
        option.addEventListener("click", (element) => {
            optionsItems.forEach((item) =>
                item.classList.remove("element__selected")
            );
            option.classList.add("element__selected");

            const folderHash = option.getAttribute("data-hash");
            updateBreadcrumbs(folderHash, breadcrumbContainer, element.target.textContent, tableContent);
            updateTable(folderHash, tableContent);
        });
    });
});
