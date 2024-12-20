class DataExplorer {
    constructor(iterable) {
        // Inicializar la clase con un iterable
        this.data = iterable;
    }

    getAllData(array = this.data) {
        for (let element of array) {
            if (Array.isArray(element)) {
                // Verificar si es un directorio
                if (element[1] === "/") {
                    console.log(`Directory: ${element[2]}`);
                    // Llamar recursivamente con el contenido del directorio
                    this.getAllData(element.slice(3));
                } else if (element[1] === "file") {
                    // Verificar si es un archivo
                    console.log(`File: ${element[2]}`);
                } else {
                    // Si no es un directorio ni archivo, pero es un array, explorarlo
                    this.getAllData(element);
                }
            }
        }
    }
}

// // Ejemplo de uso:
// let collection = { 
//     "All Files": [
//         ["29384665555555555", "/", "Desktop",
//             [      
//                 ["29384r857857t5589", "file", "main.js", "19/11/24", "noshared", "664"],
//                 ["29384r857857t5589", "file", "functions.js", "19/11/24", "noshared", "654"],
//                 ["29384r857857t5589", "file", "events.js", "19/11/24", "noshared", "400"],

//                 ["845586u867877788", "/", "model", 
//                     ["59866666667777784", "file", "query.js", "19/11/24", "noshared", "664"],
//                     ["87444455476565473", "file", "fetchData.js", "19/11/24", "noshared", "654"],
//                     ["93745756757675676", "file", "dataHandler.js", "19/11/24", "noshared", "400"]
//                 ]
//             ]
//         ],

//         ["29384665555555555", "/", "Pictures",
//             [      
//                 ["29384r857857t5589", "file", "baskground.png", "19/11/24", "noshared", "664"],
//                 ["29384r857857t5589", "file", "portrait.jpg", "19/11/24", "noshared", "654"],
//                 ["29384r857857t5589", "file", "birthday.mp4", "19/11/24", "noshared", "400"],

//                 ["845586u867877788", "/", "Wallpapers", 
//                     ["59866666667777784", "file", "dynamicIsland.png", "19/11/24", "noshared", "664"],
//                     ["87444455476565473", "file", "user.ico", "19/11/24", "noshared", "654"],
//                     ["93745756757675676", "file", "hackerProfile.png", "19/11/24", "noshared", "400"]
//                 ]
//             ]
//         ] 
//     ],
//     "Folders": [],
//     "Files": []
// };

// // Crear una instancia de la clase y llamar al método
// const explorer = new DataExplorer(collection["All Files"]);
// explorer.getAllData();

export { DataExplorer };