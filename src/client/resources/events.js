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
    allDocuments: new Folder("All Documents"),
    files: new Folder("Files"),
    recent: new Folder("Recent"),
    favoriteFiles: new Folder("Favorite Files"),
    folders: new Folder("Folders"),
};

// Crear subcarpetas dentro de "Folders"
const documentsFolder = new Folder("Documents");
const imagesFolder = new Folder("Images");
const videosFolder = new Folder("Videos");
const archivesFolder = new Folder("Archives");

rootFolders.folders.addItem(documentsFolder);
rootFolders.folders.addItem(imagesFolder);
rootFolders.folders.addItem(videosFolder);
rootFolders.folders.addItem(archivesFolder);

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
const updateTable = (folderHash, elementNode) => {

    const folder = getFoldersInFolder(folderHash, rootFolders.allDocuments)[0];
    
    console.log(folder)

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
        rootFolders.allDocuments
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
const updateBreadcrumbs = (folderHash, breadcrumbContainer) => {
    breadcrumbContainer.innerHTML = ""; // Limpiar el contenedor

    const folder = getFoldersInFolder(folderHash, rootFolders.allDocuments)[0];

    if (folder) {
        const breadcrumbItem = document.createElement("p");
        breadcrumbItem.textContent = folder.name;

        breadcrumbContainer.appendChild(breadcrumbItem);
    }
};

// Inicialización de eventos en el DOM
document.addEventListener("DOMContentLoaded", () => {
    const optionsItems = document.querySelectorAll(".option__item");
    const breadcrumbContainer = document.querySelector(".breadcrump");
    const tableContent = document.querySelector(".content");

    // Seleccionar el primer elemento por defecto
    optionsItems[0].classList.add("element__selected");
    updateTable(rootFolders.allDocuments.hash, tableContent);

    // Añadir eventos a las opciones
    optionsItems.forEach((option) => {
        option.addEventListener("click", () => {
            console.log("Hola");
            optionsItems.forEach((item) =>
                item.classList.remove("element__selected")
            );
            option.classList.add("element__selected");

            const folderHash = option.getAttribute("data-hash");
            updateBreadcrumbs(folderHash, breadcrumbContainer);
            updateTable(folderHash, tableContent);
        });
    });
});
