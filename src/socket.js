module.exports = function(io){
    // para que se quede escuchando cuando 
    // existe una nueva conexion de socket
    // y envie un alert cada vez que se conecte un
    // usuario
    let nicknames = [];
    io.on('connection', socket => {
        console.log("new user connected")
        
        socket.on('new user', (data, cb) =>{
            console.log(data)
            if(nicknames.indexOf(data) != -1){
                cb(false)
            }else{
                cb(true)
                 //guardar datos dentro de la propia conexion de socket
                 socket.nickname = data;
                 nicknames.push(socket.nickname); 
                 updateNicknames();
            }
           
        })

        socket.on("send message", function (data) {
          io.sockets.emit("new message",{
              msg: data,
              nickname: socket.nickname
          })
        })

        socket.on('disconnect', data => {
            if(!socket.nickname)  return;
            nicknames.splice(nicknames.indexOf(socket.nickname), 1)
            updateNicknames();
        })

        function updateNicknames() {
            io.sockets.emit("user name", nicknames);
   
        }
    })
}



