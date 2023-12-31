const path = require('node:path');
const ftp = require('ftp-srv');

const usuarios = {
  "root": {
    password: "root",
    root: "root/" 
  },
  "test": {
    password: "test",
    root: "test/"  
  },
}

// Configuración del servidor FTP
const ftpServer = new ftp({
  url: 'ftp://127.0.0.1:21',
  pasv_url: 'ftp://127.0.0.1:3000',
  anonymous: false, 
});

ftpServer.on('login', ({ connection, username, password }, resolve, reject) => {
  // Verificar si el usuario existe y la contraseña es correcta
  if (usuarios[username] && usuarios[username].password === password) {
    const rootDir = usuarios[username].root || process.cwd();
    resolve({ root: path.resolve(rootDir) });
    console.log(`Usuario ${username} autenticado correctamente.`);
  } else {
    reject(new Error('Autenticación fallida. Usuario o contraseña incorrectos.'));
  }
});

// Evento cuando se carga un archivo
ftpServer.on('STOR', (error, fileInfo) => {
  if (error) {
    console.error('Error al cargar el archivo:', error);
  } else {
    console.log(`Archivo cargado correctamente en ${fileInfo.path}.`);
  }
});
// Evento cuando el servidor está listo
ftpServer.on('listening', () => {
  console.log(`Server listening on ${ftpServer.options.url}`);
});


// Iniciar el servidor FTP
ftpServer.listen()
  .then(() => {
    console.log('FTP Server started sucessfully!.');
})
.catch((err) => {
  console.error('Error to start FTP Server:', err);
});