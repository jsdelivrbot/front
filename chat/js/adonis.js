  var d = document;
  window.$dilooApp = {};
  var dilooWidget = new Vue({
    el:'#diloo-chat-larges'
    ,data:{
      widget:{
        alert_message:""
        ,image:""
      }
      ,ticket:{
        message_:[]
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
        var nombre = document.getElementById('user').value;
        var email = document.getElementById('last_name').value;
        if (nombre.length>1) {
          document.querySelector('#nombrev').setAttribute('style','visibility:hidden');
          if (email.length>=7) {

            diloo.User.create({name:nombre,email:email});

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
      ,sendMessage:function(){
        var message = document.getElementById('msm');
        if(this.ticket.id_){
          diloo.Ticket.sendMessage(message.value);
        }else{
          diloo.Ticket.create(message.value);
        }
        message.value='';
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
              dilooWidget.ticket.message_.push({
                type:"nuevoSender"
                ,body:window.$dilooApp.c.defaultMessage
                ,createdAt:new Date()
              })
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
            dilooWidget.widget=widget;
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
              console.log(r);
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
                s.emit('send_message',{
                    type:'nuevoSender'
                    ,ticketId:dilooWidget.ticket.id_
                    ,body:message
                });
            }
        }
        ,listeners:function(){
          s.on('connected',function(){
            console.log('connected')
          });
          s.on('reconnect',function(){
            var t = window.$dilooApp.t;
            var room= "ticket:"+dilooWidget.ticket.id_;
            s.emit("join",room);
          });
          s.on("diloo-error",function(r){
              console.log(r)
          });
          s.on('joined',function(room){
            console.log('joined to: '+room);
          });
          s.on('rsp_createTicket',function(r){
            dilooWidget.ticket = r.response;
          });
          s.on('rsp_createMessage',function(message){
            dilooWidget.ticket.message_.push(message);
          });
          s.on("closeTicket",function(data){
            dilooWidget.ticket.message_.push({
               type:"reciber"
               ,body:data.body
             });
             s.emit('leave','ticket:'+data.ticket,function(m){
               console.log(m);
             });
          });
        }
    }
  }
