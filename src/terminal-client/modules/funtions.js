"use strict";

const foo = require('./commands');
const userName = "root";
const passwordUser = "root";
let loginCurrentUser = false;

function askQuestion(question, rl) {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
}

async function verifyIdentity(r1) {
    console.log("Welcome to node-filer Terminal!")
    while (!loginCurrentUser) {
        const user = await askQuestion('Ingresa el nombre de usuario: ', r1);
        const passwd = await askQuestion('Ingresa la contraseña: ', r1)

        if (user === userName && passwd == passwordUser) break;
        console.log("Incorrect username or password, try again!")
    }
}

async function getUserInput(rl) {
    let error = '';

    await verifyIdentity(rl);
    console.log(`Welcome ${ userName }!`)

    while (true) {
        const response = await askQuestion(`node-filer${ error }>: `, rl);

        if (error === '[X]') error = '';

        if (response == "") continue;
        error = foo.hotKeys(response.trim().toLowerCase());
    }
}

module.exports = {
    getUserInput,
};