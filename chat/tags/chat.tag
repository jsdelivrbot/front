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
			<div class="wrapper" if={ response.type=="nuevoSender" }>
				<div class="utext">
					{ response.body }
					<!--<span style="font-size: 8px;position: absolute;right: 2px;">{ time() }</span> -->
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

	var serverChat ="http://192.168.1.7:4050";
	var socket = io.connect(serverChat);
	var self = this;
	var locals = JSON.parse(window.localStorage.dilooApp);
	self.company ={
		image : ''
	}
	self.messages = [] ;
	
	initmessage(){
		$.get({
			"url":"http://192.168.1.7:1337/company?id="+locals.c
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
	//creacion de ticket 
	createTicket(message){
		var user = JSON.parse(window.localStorage.dilooUser);
		console.log(user);
		socket.emit('createTicket',{
			message  	: message 
			,companyId 	: locals.c
			,userId 	: user.userid
			,areaId		:'1'
			,type    	: locals.o
		});
	
	}
	//create mensaje
	createMessage(message){
		var user = JSON.parse(window.localStorage.dilooUser)
		var data =JSON.parse(window.localStorage.dilooApp);
		socket.emit('send_message',{
			type:'nuevoSender'
			//,senderId:user.sessionid
			,ticketId:data.ticket
			,body	 :message
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
			data.ticket = resp.response.id_;
			window.localStorage.ticket=resp.response.id_;
			//console.log(data.ticket)
			self.messages.push(resp.response['message_'][0]);
			window.localStorage.dilooApp = JSON.stringify(data);
			self.update();
		});
		socket.on('joined',function(room){
			console.log('joined to: '+room);
		})
		socket.on('rsp_createMessage',function(message){
			self.messages.push(message);
			console.log(message);
			document.getElementById('chat-all').scrollTop=6000;
			self.update();
		});
       socket.on("closeTicket",function(data){
		   	self.messages.push({
				   type:"reciber"
				   ,body:data.body
			   })
		  	window.localStorage.ticket="";
		   	self.update();//
		   	self.root.querySelector('#msm').setAttribute('disabled','true');
		   	self.root.querySelector('#msm').setAttribute('placeholder','La conversación ah finalizado, gracias');
       });
       socket.on("diloo-error",function(data){
       		console.log(data);
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
		//console.log(storage)
		if (message==""){
			console.log('no se encontro mensaje');
		}else{
			if(window.localStorage.ticket && window.localStorage.ticket!="" ){
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