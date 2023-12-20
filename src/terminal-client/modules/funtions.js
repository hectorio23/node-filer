"use strict";

const { exec } = require('child_process');

const userName = "root";
const passwordUser = "root";
let loginCurrentUser = false;

async function verifyIdentity(r1) {
    while (!loginCurrentUser) {
        const user = await askQuestion('Ingresa el nombre de usuario: ', r1);
        const passwd = await askQuestion('Ingresa la contraseña: ', r1)

        if (user === userName && passwd == passwordUser) break;
        console.log("Incorrect username or password, try again!")
    }
}

function askQuestion(question, rl) {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
}

async function getUserInput(rl) {

    await verifyIdentity(rl);
    console.log(`Welcome ${ userName }!`)

    while (true) {
        const response = await askQuestion('node-filer>: ', rl);

        // Elimina el tecto en consola
        // if (response.trim() === "clear") console.clear();
        // if (response.trim() === "pwd") console.log(__dirname);
        if (response == "") continue;
        await exec(response, (error, stdout, stderr) => {
            if (error) {
              console.error(`Error al ejecutar el comando: ${error}`);
              return;
            }
          
            console.log(`Resultado del comando:\n${stdout}`);
          });
    }
}

module.exports = {
    getUserInput,
  };