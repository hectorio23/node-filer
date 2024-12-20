// return "Hola XD";

let collection = { 
    "All Files": [
        ["29384665555555555", "/", "Desktop",
            [      
                ["cmfjncfnfh", "file", "main.js", "19/11/24", "noshared", "664"],
                ["jcvhfbrviiiirr", "file", "functions.js", "19/11/24", "noshared", "654"],
                ["844577777778666666", "file", "events.js", "19/11/24", "noshared", "400"],

                ["845586u867877788", "/", "model", 
                    ["59866666667777784", "file", "query.js", "19/11/24", "noshared", "664"],
                    ["87444455476565473", "file", "fetchData.js", "19/11/24", "noshared", "654"],
                    ["93745756757675676", "file", "dataHandler.js", "19/11/24", "noshared", "400"]
                ]
            ]
        ],

        ["29384r857857t5589", "file", "key.psk", "19/11/24", "noshared", "664"],

        ["98557576776688686868", "/", "Pictures",
            [      
                ["29384r857857t5589", "file", "baskground.png", "19/11/24", "noshared", "664"],
                ["29384r857857t5589", "file", "portrait.jpg", "19/11/24", "noshared", "654"],
                ["29384r857857t5589", "file", "birthday.mp4", "19/11/24", "noshared", "400"],

                ["845586u867877788", "/", "Wallpapers", 
                    ["59838477777777777", "file", "dynamicIsland.png", "19/11/24", "noshared", "664"],
                    ["984957hfhtughtutg", "file", "user.ico", "19/11/24", "noshared", "654"],
                    ["8734743", "file", "hackerProfile.png", "19/11/24", "noshared", "400"]
                ]
            ]
        ] 
    ],
    "Folders": [],
    "Files": []
};

const getAllData = (array) => {
    for (let element of array) {
        if (Array.isArray(element)) {
            // Verificar si es un directorio
            if (element[1] === "/") {
                console.log(`Directory: ${element[2]}`);
                // Llamar recursivamente con el contenido del directorio
                getAllData(element.slice(3));
            } else if (element[1] === "file") {
                // Verificar si es un archivo
                console.log(`File: ${element[2]}`);
            } else {
                // Si no es un directorio ni archivo, pero es un array, explorarlo
                getAllData(element);
            }
        }
    }
};

// Llamar a la función con el array principal
getAllData(collection["All Files"]);


