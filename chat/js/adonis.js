  var d = document;
  window.$dilooApp = {};

  var dilooWidget = new Vue({
    el:'#diloo-chat-larges'
    ,data:{
      widget:{
        alert_message:""
        ,image:""
      }
    }
    ,methods:{
      a:function(){
        document.querySelector('#diloo-chat-larges #pmsj').setAttribute('class','none');
      }
      ,abrir:function(){
        document.querySelector('#diloo-chat-larges bubble').setAttribute('class','none');
        document.querySelector('#diloo-chat-larges #pmsj').setAttribute('class','none');
        document.querySelector('#diloo-chat-larges #allchat').setAttribute('class','shows');
        document.querySelector('#diloo-chat-larges #allchat login').setAttribute('class','show');
      }
      ,validation:function(e){
        console.log(e);
        var nombre = document.getElementById('user').value;
        var email = document.getElementById('last_name').value;
        if (nombre.length>1) {
          document.querySelector('#nombrev').setAttribute('style','visibility:hidden');
          if (email.length>=7) {
            document.querySelector('#diloo-chat-larges #allchat login #formfc').setAttribute('class','none');
            document.querySelector('#diloo-chat-larges #allchat chat').setAttribute('class','show');
            document.querySelector('#emailv').setAttribute('style','visibility:hidden');
          }else{
            document.querySelector('#emailv').setAttribute('style','visibility:visible');
          }
        }else{
          document.querySelector('#nombrev').setAttribute('style','visibility:visible');
        }
      }
      ,cerrar:function(){
        document.querySelector('#diloo-chat-larges bubble').setAttribute('class','show');
        document.querySelector('#diloo-chat-larges #allchat').setAttribute('class','none');
      }
    }
  });
  function readCookie(name) {
      return (name = new RegExp('(?:^|;\\s*)' + ('' + name).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '=([^;]*)').exec(d.cookie)) && name[1];
  }
  try{
      window.$dilooApp.w = JSON.parse(atob(readCookie('__cid')));
      var diloo = new Diloo();
      diloo.init();
      diloo.Widget.setType();
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
        ,Widget:{
          setType:function(){
            var src = "";
            var widget = JSON.parse(c.w);
            if (widget.widget_type=="type0") {
              src="https://s3-sa-east-1.amazonaws.com/diloo-assets/widget/burbuja01_48.png";
            }else if(widget.widget_type=="type1"){
              src="https://s3-sa-east-1.amazonaws.com/diloo-assets/widget/burbuja02_48.png";
            }else{
              src="https://s3-sa-east-1.amazonaws.com/diloo-assets/widget/burbuja03_48.png";
            }
            widget.image = src;
            dilooWidget.$data.widget=widget;
            console.log(dilooWidget.$data)
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
