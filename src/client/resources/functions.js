import { Document } from "./documents.js";
import { Folder } from "./folders.js";

// Función para obtener un documento a partir de su hash
function getDocumentByHash(hash, folder) {
    for (const item of folder.getContents()) {
        if (item instanceof Document && item.hash === hash) {
            return item;
        } else if (item instanceof Folder) {
            const found = getDocumentByHash(hash, item);
            if (found) return found;
        }
    }
    return null;
}

// Obtener documentos dentro de un folder dado
function getDocumentsInFolder(folder) {
    return folder.getContents().filter(item => item instanceof Document);
}

// Obtener carpetas dentro de un folder dado
function getFoldersInFolder(folderHash, root) {
    return root.getContents().filter(item => item instanceof Folder);
}

// Obtener todo el contenido (folders y documentos) de todos los subfolders
function getAllContentsFromAllFolders(folder) {
    const allContents = [...folder.getContents()];
    for (const item of folder.getContents()) {
        if (item instanceof Folder) {
            allContents.push(...getAllContentsFromAllFolders(item));
        }
    }
    return allContents;
}

// Obtener todo el contenido de un folder específico dado su hash
function getContentsByFolderHash(hash, rootFolder) {
    if (rootFolder.hash === hash) {
        return rootFolder.getContents();
    }
    for (const item of rootFolder.getContents()) {
        if (item instanceof Folder) {
            const found = getContentsByFolderHash(hash, item);
            if (found) return found;
        }
    }
    return null;
}

export {
    getDocumentByHash,
    getFoldersInFolder,
    getAllContentsFromAllFolders,
    getContentsByFolderHash
};
