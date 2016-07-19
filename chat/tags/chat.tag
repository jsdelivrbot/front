<chat>
<div class="start-chat">
	<div class="all" id="chat-all">
		<div each = { messages } class={ type } >
			<div class="wrapper" if={ type=="reciber" }>
				<div class="bimg">
					<img src="img/komo7.jpg">
				</div>
				<div class="text">
					{ body }
				</div>			
			</div>	
			<div class="wrapper" if={ type=="nuevoSender" }>
				<div class="utext">
					{ body } 
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

	var serverChat ="http://localhost:3000";
	var socket = io.connect(serverChat);
	var self = this;
	var locals = JSON.parse(window.localStorage.dilooApp);
	self.messages = [] ;
	
	createTicket(message){
		var user = JSON.parse(window.localStorage.dilooUser)
		socket.emit('create_ticketV2',{
			message  : message 
			,company : locals.c
			,session : user.sessionid
			,type    : locals.o
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
		socket.on('created_ticketV2',function(resp){
			//socket.emit('join','ticket:'+resp.id);
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
		if(storage.ticket){
			console.log('enviar')
			this.createMessage(message);
		}else{
			console.log('crear')
			this.createTicket(message);
		}
		this.msm.value = '';
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
	})
</script>
</chat>