
$(function(){
    const socket = io(); 
    
    // obteniendo los elementos de DOM

    const $messageForm =  $('#message-form')
    const $messageBox = $("#message");
    const $chat   = $("#chat"); 
    
    const $nickForm = $('#nickForm');
    const $nickError = $("#nickError");
    const $nickname  = $("#nickname");

    $nickForm.submit((e)=>{
        e.preventDefault()
        socket.emit('new user', $nickname.val(), (data) =>{
            if(data){
                $('#nickWrap').hide()
                $('#contentWrap').show()
            }else{
                $nickError.html(`<div class="alert alert-danger">
                    That username already exist
                </div>`)
            }
            $nickname.val('')
        })
    })
    //escuchando el datos enciado por el servidor
    socket.on("new message", (data) =>{
        $chat.append(`<b> ${data.nickname} </b>: ${data.msg } </br>`)
    });

    socket.on('user name', (data) =>{
        $("#username").empty();
        let html = '';
        data.forEach(element => {
            html += `<p> ${element} </p>`
            
        });
        $("#username").append(html);

        
    })
    socket.on('whisper', data => {
        $chat.append(`<p class="whisper"><b> ${data.nickname}:</b> ${data.msg}</p>`)
    })

    socket.on('load old msgs', data =>{
        $chat.empty();
        for(let i = 0; i < data.length; i++){
            displayMessage(data[i])
        }
    })

    function displayMessage(data){
                $chat.append(
                  `<p class="whisper"><b> ${
                    data.nickname 
                  }: </b> ${data.msg}</p>`
                );

    }
    // eventos 
    $messageForm.submit((e) =>{
        e.preventDefault();
        $messageBox.val();
        //creamos un evento
        socket.emit('send message', $messageBox.val(), data =>{
            $chat.append(`<p class="error">${data}</p>`)
        })
        $messageBox.val('');

    })
})