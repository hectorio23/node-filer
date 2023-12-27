const ftp = require('ftp-srv');

// Configuración del servidor FTP
const ftpServer = new ftp({
  url: 'ftp://127.0.0.1:21', // Puedes cambiar la dirección y el puerto según tus necesidades
  pasv_url: 'ftp://127.0.0.1:3000', // Puedes cambiar la dirección y el puerto para el modo pasivo
  anonymous: true, // Permitir conexiones anónimas (puedes cambiar a false para requerir autenticación)
});

// Evento cuando se establece una conexión
ftpServer.on('login', (data, resolve, reject) => {
  // Permitir conexión anónima (puedes implementar autenticación aquí si anonymous es false)
  resolve({ root: process.cwd() });
});

// Evento cuando el servidor está listo
ftpServer.on('listening', () => {
  console.log(`Servidor FTP escuchando en ${ftpServer.options.url}`);
});

// Iniciar el servidor FTP
ftpServer.listen()
  .then(() => {
    console.log('Servidor FTP iniciado correctamente.');
  })
  .catch((err) => {
    console.error('Error al iniciar el servidor FTP:', err);
  });
