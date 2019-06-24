module.exports = function(io){
    // para que se quede escuchando cuando 
    // existe una nueva conexion de socket
    // y envie un alert cada vez que se conecte un
    // usuario
    io.on('connection', socket => {
        console.log("new user connected")
        
        socket.on("send message", function (data) {
          io.sockets.emit("new message",data)
        });
    })
}



