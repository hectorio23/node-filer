// Importa las bibliotecas necesarias
const path = require('node:path'); // Importa el módulo 'path' de Node.js para manejar rutas de archivos
const ftp = require('ftp-srv'); // Importa el módulo 'ftp-srv' para crear un servidor FTP

// Definición de usuarios con sus credenciales y directorios raíz
const usuarios = {
  "root": {
    password: "root",
    root: "root/" // Directorio raíz para el usuario 'root'
  },
  "test": {
    password: "test",
    root: "test/" // Directorio raíz para el usuario 'test'
  },
}

// Configuración del servidor FTP
const ftpServer = new ftp({
  url: 'ftp://127.0.0.1:21', // URL del servidor FTP
  pasv_url: 'ftp://127.0.0.1:3000', // URL para el modo pasivo del servidor FTP
  anonymous: false, // Deshabilita el acceso anónimo al servidor FTP
});

// Maneja el evento cuando un usuario inicia sesión
ftpServer.on('login', ({ connection, username, password }, resolve, reject) => {
  // Verifica si el usuario existe y la contraseña es correcta
  if (usuarios[username] && usuarios[username].password === password) {
    const rootDir = usuarios[username].root || process.cwd(); // Obtiene el directorio raíz del usuario o el directorio de trabajo actual del proceso
    resolve({ root: path.resolve(rootDir) }); // Resuelve la promesa con la ruta absoluta del directorio raíz del usuario
    console.log(`Usuario ${username} autenticado correctamente.`); // Mensaje de registro indicando la autenticación exitosa
  } else {
    reject(new Error('Autenticación fallida. Usuario o contraseña incorrectos.')); // Rechaza la promesa si la autenticación falla
  }
});

// Maneja el evento cuando el usuario carga archivos
ftpServer.on('STOR', (error, fileInfo) => {
  if (error) {
    console.error('Error al cargar el archivo:', error); // Muestra un mensaje de error si hay algún problema al cargar el archivo
  } else {
    console.log(`Archivo cargado correctamente en ${fileInfo.path}.`); // Mensaje de registro indicando que el archivo se cargó correctamente
  }
});

// Maneja el evento cuando el servidor está listo para aceptar conexiones
ftpServer.on('listening', () => {
  console.log(`Server listening on ${ftpServer.options.url}`); // Mensaje de registro indicando que el servidor FTP está escuchando en una dirección específica
});

// Punto de inicio del servidor FTP
ftpServer.listen()
  .then(() => {
    console.log('FTP Server started sucessfully!.'); // Mensaje de registro indicando que el servidor FTP se inició correctamente
})
.catch((err) => {
    console.error('Error to start FTP Server:', err); // Muestra un mensaje de error si hay algún problema al iniciar el servidor FTP
});
