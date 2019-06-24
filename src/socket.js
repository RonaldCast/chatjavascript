const Chat = require('./models/Chat')

module.exports = function(io){
    // para que se quede escuchando cuando 
    // existe una nueva conexion de socket
    // y envie un alert cada vez que se conecte un
    // usuario
    let  users = {};
    io.on('connection', async socket => {
        console.log("new user connected")
        var messages = await Chat.find({})
        socket.emit('load old msgs', messages)
        socket.on('new user', (data, cb) =>{
            if(data in users){
                cb(false)
            }else{
                cb(true)
                 //guardar datos dentro de la propia conexion de socket
                 socket.nickname = data;
                 users[socket.nickname] = socket; 
                 updateNicknames();
            }
           
        })

        socket.on("send message",  async (data, cb) =>{
            var msg  = data.trim()
            
            if(msg.substr(0,2) === '/w'){
                msg = msg.substr(3)
                const index = msg.indexOf(' ')
                if(index !== -1){
                    var name = msg.substr(0, index)
                    var msg = msg.substr(index + 1)
                    if(name in users){
                        users[name].emit('whisper', {
                            msg,
                            nickname: socket.nickname 
                        })
                    }else{
                         cb("Error! Please Enter a Valid User")
                    }
                }else{
                    cb('por favor ingrese su mensaje')
                }
            }else{
              var newMessage = new Chat({
                  msg,
                  nickname: socket.nickname
                })
               await newMessage.save()
                io.sockets.emit("new message",{
                    msg: data,
                    nickname: socket.nickname
                })
            }
        
        })
        
        //cuando se desconecta un socket
        socket.on('disconnect', data => {
            if(!socket.nickname)  return;
            delete users[socket.nickname]
            updateNicknames();
        })

        function updateNicknames() {
            //para enviar un areglo de usuario 
            io.sockets.emit("user name", Object.keys(users));
   
        }
    })
}



