
$(function(){
    const socket = io(); 
    
    // obteniendo los elementos de DOM

    const $messageForm =  $('#message-form')
    const $messageBox = $("#message");
    const $chat   = $("#chat"); 
    //escuchando el datos enciado por el servidor
    socket.on("new message", (data) =>{
        $chat.append(data + "<br>")
    });

    // eventos 
    $messageForm.submit((e) =>{
        e.preventDefault();
        $messageBox.val();
        //creamos un evento
        socket.emit('send message', $messageBox.val())
        $messageBox.val('');


    })
})