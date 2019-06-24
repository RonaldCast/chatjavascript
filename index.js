const http = require('http');

const express = require('express');
const socketio  = require('socket.io');

const app = express()

// crear otro servidor
//se hace esto para darle un servidor a socket.io para que funcione  
const server = http.createServer(app)
//para que socket.io escuche en el servidor creado 
//y además se cree la conexion en tiempo real
const io = socketio.listen(server)
 
// para que se quede escuchando cuando 
// existe una nueva conexion de socket
// y envie un alert cada vez que se conecte un
// usuario
io.on('connection', socket)

// para enviarle el html al 
//navegardor de manera estatica.  
//static file 
app.use(express.static('public'))




server.listen(3000, () => {
  console.log("Server on port 3000, http://localhost:3000");
});