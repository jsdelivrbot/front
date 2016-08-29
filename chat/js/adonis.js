var d = document;
window.$dilooApp = {};
function readCookie(name) {
    return (name = new RegExp('(?:^|;\\s*)' + ('' + name).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '=([^;]*)').exec(d.cookie)) && name[1];
}
try{
   window.$dilooApp.w = JSON.parse(atob(readCookie('__cid')));
   var diloo = new Diloo();
   diloo.init();
   diloo.setType();
   diloo.listeners();
}catch(e){
  console.error(e);
}

function Diloo(){
  var c = window.$dilooApp;
  var S ="http://192.168.1.7:4050";
  var s = io.connect(S);
  return {
      init: function(){
          var cid=JSON.parse(c.w)['company'];
          s.emit('getCompanyInfo',{companyId:cid},function(r){
            window.$dilooApp.w=JSON.parse(window.$dilooApp.w);
            window.$dilooApp.c=r.response;
          });
      }
      ,widget:{
        setType:function(){
          //setting widget ingo
          var w = window.$dilooApp.w;
          widget.setType({type:w.widget_type,message:w.alert_message});
        }
      }
      ,User:{
        create:function(user){
          var u = {
            name      : user.name
            ,email    : user.email
            ,origin   : window.$dilooApp.w.execType
            ,createdBy : window.$dilooApp.w.company
          }
          s.emit('createUser',u,function(r){
            window.$dilooApp.u=r.response;
          })
        }
      }
      ,Ticket:{
          create:function(message){
              var u = window.$dilooApp.u;
              var w = window.$dilooApp.w;
              s.emit('createTicket',{
                  userId     : u.userid
                  ,companyId : w.company
                  ,message   : message
                  ,type      : w.execType
                  ,areaId    : '1'
              });
          }
          ,sendMessage:function(message){
              var u = window.$dilooApp.u;
              var t = window.$dilooApp.t;
              s.emit('send_message_web',{
                  type:'nuevoSender'
                  ,senderId:u.userid
                  ,ticket:t.id_
                  ,message:message
              });
          }
      }
      ,listeners:function(){
        s.on('connected',function(){
    			console.log('connected')
    		});
        s.on('reconnect',function(){
    		  var t = window.$dilooApp.t;
    		  var room= "ticket:"+t.id_;
    		  socket.emit("join",room);
        });
        s.on("diloo-error",function(r){
            console.log(r)
        });
        s.on('joined',function(room){
    			console.log('joined to: '+room);
    		});
        s.on('rsp_createTicket',function(r){
          window.$dilooApp.t = r.response;
        });
        s.on('rsp_createMessage',function(message){
    			window.$dilooApp.t.messages_.push(message);
    		});
        s.on("closeTicket",function(data){
   		   	window.$dilooApp.t.messages_.push({
   				   type:"reciber"
   				   ,body:data.body
   			   })
   		  	window.$dilooApp.t="";
        });
      }
  }
}

/*
function Diloo(){
  var serverChat ="http://192.168.1.7:4050";
  var s = io.connect(serverChat);
  //properties
  var c = {
    w : JSON.parse(window.$dilooApp.w)
  }
  return {
    init :function(c){
      s.emit('getCompanyInfo',{companyId:c.w.company},function(r){
        self.c.c=r.response;
      });
    }
    ,p:{
      c:{}
      ,w:{}
    }
    ,m:{
      sw:function(w){
        this.p.w=w;
      }
    }
  }
  (function(){
    s.on('connect',function(){
      console.log('connected to diloo chat');
    })

  })()
  return {
    c:c
  }

}
*/
