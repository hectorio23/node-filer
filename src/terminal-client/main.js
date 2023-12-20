"use strict";

const readline = require('readline');
const functions = require('./modules/funtions')


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


// Inicia la solicitud de entrada
functions.getUserInput(rl);
