window.serverIp = "http://192.168.1.17:1337";
function Chat(){
     var socket = io.connect("http://dilooapp.com:3000");
     function join(room){
        socket.emit('join',room,function(data){
            console.log(data);
        });       
     }
     function onMessage(message){
         
     }
     function sendMessage(message){
         
     }
     function createTicket(){
         
     }
     function connect(){
         socket.on('connected',function(){
            console.log('connected'); 
         });
     }
     return {
         join         : join
         ,onMessage   : onMessage
         ,sendMessage : sendMessage
         ,connect     : connect()
     }
}
function Actions (){
    function login(user){
        var url =JSON.parse(window.localStorage.dilooApp);
        var origin  = url.o;
        var company = url.c;    
        console.log(url)    
        if(user.name && user.email && origin && company ){
            $.ajax({
                url:window.serverIp + '/integrations/createuser'
                ,data:{
                    name       : user.name
                    ,email     : user.email
                    ,origin    : origin
                    ,createdBy : company
                }
                ,method:"POST"
            });
            console.log("ok");
        }else{
            return {error:'invalid params',success:false}
        }

    }
    function createTicket(message){
        var url =JSON.parse(window.localStorage.dilooApp);
        var origin  = url.o;
        var company = url.c;
        var users = JSON.parse(window.localStorage.dilooUser);
        var sesionid=users.sessionid;
        var msj = document.getElementById('msm');
        console.log(url)    
        if(origin && company && sesionid && msj){
            $.ajax({
                url:window.serverIp + '/integrations/createTickets'
                ,data:{
                    message       : msj
                    ,companyId    : company
                    ,sessionId    : sesionid
                    ,areaId       : "1"
                    ,type         : origin
                }
                ,method:"POST"
                ,success:function(data){
                    console.log(data);
                    if(data.error){
                       console.log(data); 
                    }else if(data.result.length){
                        var token = JSON.stringify(data.result[0]);
                        window.localStorage.dilooUser = token;
                        console.log('ok');
                        start();
                        return {error:null,success:true}
                    }else{
                        
                    }
                }
            })
        }else{
            console.log('invalid params');
        }

    }
    return{
        login:login
        ,'createTicket':createTicket
    }
}

//actions.login({name:'miguel',email:'maliaga.pantoja@gmail.com'});