const http = require('http');
const path = require('path');
const express = require('express');
const socketio  = require('socket.io');

const mongoose = require('mongoose');

const app = express()

//db connection

mongoose.connect('mongodb://localhost:27017/chat', {useNewUrlParser: true }) 
  .then((db) =>{
    console.log('db is connected')
  })
  .catch(error => {
    console.log(error)
  })

// crear otro servidor
//se hace esto para darle un servidor a socket.io para que funcione  
const server = http.createServer(app)
//para que socket.io escuche en el servidor creado 
//y además se cree la conexion en tiempo real
const io = socketio.listen(server)
 
require('./socket')(io);

// para enviarle el html al 
//navegardor de manera estatica.  
//static file 
app.set('port', process.env.PORT || 3000)
app.use(express.static(path.join(__dirname, "public")));
 
server.listen(app.get('port'), () => {
  console.log(
    `Server on port ${app.get("port")}, http://localhost:${app.get("port")}`
  );
});