  var d = document;
  window.$dilooApp = {};
  var dilooWidget = new Vue({
    el:'#diloo-chat-larges'
    ,data:{
      widget:{
        welcome_message :""
        ,button_color   :""
        ,header_color   :""
        ,input_rules    :{}
        ,left_bubble    :""
        ,right_bubble   :""
        ,text_color     :""
        ,offline_message: ""
      }
      ,ticket:{
        message_:[]
      }
      ,company:{}
    }
    ,methods:{
      a:function(){
        document.querySelector('#diloo-chat-larges #pmsj').setAttribute('class','none');
      }
      ,abrir:function(){
        document.querySelector('#pmsj').setAttribute('class','none')
        document.querySelector('#allchat').setAttribute('class','shows')
        document.querySelector('#arrow-chat').setAttribute('class','arrow-down-chat')

      }
      ,validation:function(e){
        event.preventDefault()
        var nombre = document.getElementById('user').value;
        var email = document.getElementById('last_name').value;
        var phon = document.getElementById('phone').value;
        if (nombre.length>1) {
          document.querySelector('.diloo-form .vname').setAttribute('style','visibility:hidden');

          if (email.length>=7) {
              document.querySelector('.diloo-form .vmail').setAttribute('style','visibility:hidden');
              if (phon.length==9) {
                diloo.User.create({name:nombre,email:email});
                document.querySelector('#chat-body-login').setAttribute('class','none');
                document.querySelector('#chat-body').setAttribute('class','show');
              }else{
              document.querySelector('.diloo-form .vphone').setAttribute('style','visibility:visible');
              }
          }else{
            document.querySelector('.diloo-form .vmail').setAttribute('style','visibility:visible');
          }
        }else{
          document.querySelector('.diloo-form .vname').setAttribute('style','visibility:visible');
        }
      }
      ,sendMessage:function(){
        var message = document.getElementById('msm');
        if(this.ticket.id_){
          diloo.Ticket.sendMessage(message.value);
          var elmnt = document.getElementById("scroll");
          var scro=document.getElementById('scroll').clientHeight;
          elmnt.scrollTop = scro;
        }else{
          diloo.Ticket.create(message.value);
        }
        message.value='';
      }
      ,cerrar:function(){
        document.querySelector('#allchat').setAttribute('class','none')
        document.querySelector('#arrow-chat').setAttribute('class','arrow-down-chat-none')
      }
    }
  });
  function readCookie(name) {
      return (name = new RegExp('(?:^|;\\s*)' + ('' + name).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '=([^;]*)').exec(d.cookie)) && name[1];
  }
  try{
    if (window.localStorage.$dilooApp.length>0) {
      document.querySelector('#chat-body-login').setAttribute('class','none');
      document.querySelector('#chat-body').setAttribute('class','show');
      getTicketMessages(window.localStorage.$dilooApp);
    }else{
      window.$dilooApp.w = JSON.parse(atob(readCookie('__cid')));
      var diloo = new Diloo();
      diloo.init();
      diloo.Widget.setType();
      diloo.listeners();
      }
  }catch(e){
    console.error(e);
  }


  function Diloo(){
    var c = window.$dilooApp;
    var S ="http://39593f9b.ngrok.io";
    var s = io.connect(S);
    return {
        init: function(){
            var cid=JSON.parse(c.w)['company'];
            s.emit('getCompanyInfo',{companyId:cid},function(r){
              window.$dilooApp.w=JSON.parse(window.$dilooApp.w);
              window.$dilooApp.c=r.response;
              dilooWidget.company = window.$dilooApp.c;
              dilooWidget.ticket.message_.push({
                type:"reciber"
                ,body:window.$dilooApp.c.defaultMessage
                ,createdAt:new Date()
              })
            });
        }
        ,Widget:{
          setType:function(){
            var src = "";
            var widget = JSON.parse(c.w);
            if (widget.input_rules.name!=true && widget.input_rules.email!=true && widget.input_rules.phone!=true) {
              document.querySelector('#chat-body-login').setAttribute('class','none');
              document.querySelector('#chat-body').setAttribute('class','show');
            }else{
              if (widget.input_rules.name==true) {
                document.querySelector('#user').setAttribute('style','display:block');
                document.querySelector('#label_name').setAttribute('style','display:block');
              }else{
                document.querySelector('#user').setAttribute('style','display:none');
                document.querySelector('#label_name').setAttribute('style','display:none');
              }if(widget.input_rules.email==true){
                document.querySelector('#last_name').setAttribute('style','display:block');
                document.querySelector('#label_correo').setAttribute('style','display:block');
              }else{
                  document.querySelector('#last_name').setAttribute('style','display:none');
                  document.querySelector('#label_correo').setAttribute('style','display:none');
              }if(widget.input_rules.phone==true){
                document.querySelector('#phone').setAttribute('style','display:block');
                document.querySelector('#labelp').setAttribute('style','display:block');
              }else{
                document.querySelector('#phone').setAttribute('style','display:none');
                document.querySelector('#labelp').setAttribute('style','display:none');
              }
            }
            //widget.image = src;
            dilooWidget.widget=widget;
          }
        }
        ,User:{
          create:function(user){
            /*var u = {
              name      : user.name
              ,email    : user.email
              ,origin   : window.$dilooApp.w.execType
              ,createdBy : window.$dilooApp.w.company
            }
            s.emit('createUser',u,function(r){
              console.log(r);
              window.$dilooApp.u=r.response;
            });*/
            window.$dilooApp.u = {
              userid     : '1e7234ec-672d-4adc-9da6-a4c0dc6b2992'
              ,sessionid : '244372be-efd9-4bfb-925b-a0858b95befe'
            }
          }
        }
        ,Ticket:{
            getTicketMessages:function(TicketId){
              s.emit('getTicketMessages',{
                ticketId:TicketId
              })
            }
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
            window.localStorage.$dilooApp = r.response.id_; 
          });
          s.on('rsp_createMessage',function(message){
            dilooWidget.ticket.message_.push(message);
          });
          s.on("closeTicket",function(data){
            window.localStorage.$dilooApp = "";
            dilooWidget.ticket.message_.push({
               type:"reciber"
               ,body:data.body
             });
            document.getElementById('msm').setAttribute('disabled','true');
             s.emit('leave','ticket:'+data.ticket,function(m){
               console.log(m);
             });
          });
        }
    }
  }
