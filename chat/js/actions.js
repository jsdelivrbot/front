window.serverIp = "http://192.168.1.17/integrations/createuser";
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
        var url = window.location.href.split('?');
        var origin  = url[1].split('&')[1];
        var company = url[1].split('&')[0];        
        if(user.name && user.email && origin && company ){
            $.ajax({
                url:window.serverIp
                ,data:{
                    name       : user.name
                    ,email     : user.email
                    ,origin    : origin
                    ,createdBy : company
                }
                ,method:"POST"
                ,success:function(data){
                    if(data.error){
                        
                    }else if(data.result.length){
                        var token = JSON.stringify(data.result[0]);
                        window.localStorage.dilooUser = token;
                        return {error:null,success:true}
                    }else{
                        
                    }
                }
            })
        }else{
            return {error:'invalid params',success:false}
        }
    }
    return{
        login:login
    }
}
var actions = new Actions();
actions.login({name:'miguel',email:'maliaga.pantoja@gmail.com'});