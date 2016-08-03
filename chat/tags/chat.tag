<chat>
<div style="width: 100%;height: 260px;">
	<div class="all" id="chat-all">
		<div each = { messages } class={ type } >
			<div class="wrapper" if={ type=="reciber" }>
				<div class="bimg">
					<img src={ company.image }>
				</div>
				<div class="text">
					{ body }
				</div>			
			</div>	
			<div class="wrapper" if={ type=="nuevoSender" }>
				<div class="utext">
					{ body }
					<span style="font-size: 8px;position: absolute;right: 2px;">{ time() }</span> 
				</div>		
			</div>							
		</div>	
	</div>	
	<div class="foot-msj">
		<form method="POST" onsubmit={send}>
			<input type="text" id="msm" placeholder="escribe tu mensaje" name="message">
		</form>
	</div>
</div>
<script>

	var serverChat ="http://192.168.1.45:4050";
	var socket = io.connect(serverChat);
	var self = this;
	var locals = JSON.parse(window.localStorage.dilooApp);
	self.company ={
		image : ''
	}
	self.messages = [] ;
	
	initmessage(){
		$.get({
			"url":"http://192.168.1.45:1337/company?id="+locals.c
		})
		.done(function(data){
			console.log(data);
			self.company.image = data.image;
			if(data.isConnected == 1){
				self.messages.push({
					body:data['defaultMessage']
					,type:'reciber'
				});
			}else{
				self.messages.push({
					body:data['disconnectedMessage']
					,type:'reciber'
				});				
			}
			self.update();
		})
		.fail(function(e){
			console.log(e);
		})
	}
	createTicket(message){
		var user = JSON.parse(window.localStorage.dilooUser)
		socket.emit('createTicket',{
			message  	: message 
			,companyId 	: locals.c
			,userId 	: user.userid
			,areaId		:'1'
			,type    	: locals.o
		});
	
	}	
	createMessage(message){
		var user = JSON.parse(window.localStorage.dilooUser)
		var data =JSON.parse(window.localStorage.dilooApp);
		socket.emit('send_message_web',{
			type:'nuevoSender'
			,senderId:user.sessionid
			,ticket:data.ticket
			,message:message
		});
	}	
    listeners(){
		socket.on('connected',function(){
			console.log('connected')
		})
		socket.on('rsp_createTicket',function(resp){
			//socket.emit('join','ticket:'+resp.id);
			console.log(resp);
			var data =JSON.parse(window.localStorage.dilooApp);
			data.ticket = resp.id;
			window.localStorage.dilooApp = JSON.stringify(data);
		});
		socket.on('joined',function(room){
			console.log('joined to: '+room);
		})
		socket.on('new_message',function(message){
			self.messages.push(message);
			console.log(message);
			self.update();
		});
       socket.on("closeTicket",function(data){
		   	self.message.push({
				   type:"reciber"
				   ,body:data.body
			   })
       });
      socket.on('reconnect',function(){
		  var storage = JSON.parse(window.localStorage.dilooApp);
		  var room= "ticket:"+storage.ticket;
		  socket.emit("join",room);
      });	   			
    }
	send(e){
		e.preventDefault()
		var message  = this.msm.value;
		var storage = JSON.parse(window.localStorage.dilooApp);
		if (message==""){
			console.log('no se encontro mensaje');
		}else{
		if(storage.ticket){
			console.log('enviar')
			this.createMessage(message);
			document.getElementById('chat-all').scrollTop=6000;
		}else{
			console.log('crear')
			this.createTicket(message);
		}
		this.msm.value = '';
		}
	}
	time(){
		var tiempo = new Date();
		var hora = tiempo.getHours();
		var minuto = tiempo.getMinutes();
		var t=hora+":"+minuto;
		//$('.date').text(t);
		return t;
	}
	this.on('mount',function(){
		this.listeners();
		this.initmessage();
	})
</script>
</chat>