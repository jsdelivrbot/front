function DilooApp (){
    var socket ;
    var locals = JSON.parse(window.localStorage.dilooApp);
    locals.ticket = '';    
    var serverIp = "http://localhost:1337";
        
    return {
        User:{
            login:function login(user,cb){ 
                if(user.name && user.email && locals.o && locals.c ){
                    var request= $.ajax({
                            url:serverIp + '/integrations/createuser'
                            ,data:{
                                name       : user.name
                                ,email     : user.email
                                ,origin    : locals.o
                                ,createdBy : locals.c
                            }
                            ,method:"POST"
                        });
                    // Callback handler that will be called on success
                    request.done(function (response, textStatus, jqXHR){
                        if(response.error ){
                            alert(response.error);
                        }else{
                            window.localStorage.dilooUser = JSON.stringify(response.result[0]);
                            cb({status:200});
                        }
                    });
                    // Callback handler that will be called on failure
                    request.fail(function (jqXHR, textStatus, errorThrown){
                        cb({status:500});
                    });
                }else{
                    return {error:'invalid params',success:false}
                }
            }            
        },
        Chat:{
            connect:function(){
                socket = io.connect(serverChat);
                this.listeners();
            }

            ,ticket:{
                create:function(message){
                    var user = JSON.parse(window.localStorage.dilooUser)
                    socket.emit('create_ticketV2',{
                        message  : message 
                        ,company : locals.c
                        ,session : user.sessionid
                        ,type    : locals.o
                    });
                
                }
                ,sendMessage:function(message){
                    var user = JSON.parse(window.localStorage.dilooUser)
                    var data =JSON.parse(window.localStorage.dilooApp);
                    socket.emit('send_message_web',{
                        type:'nuevoSender'
                        ,senderId:user.sessionid
                        ,ticket:data.ticket
                        ,message:message
                    });
                }
            }
        }
    }
};
var diloo = new DilooApp();