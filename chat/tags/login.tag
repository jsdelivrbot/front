<login>
<form onsubmit={send} class="fc" id="formfc"> 
	<div class="formulario">				
		<div class="input-field col s6">				 
			<input id="user" name="user" type="text" class="validate" minlength="1" placeholder="NOMBRE">
			<span id="nombrev" class="none">*Nombre demasiado corto</span>
		</div>
		<div class="input-field col s6" id="field-mail">
			<input id="last_name" name="last_name" type="email" class="validate" placeholder="EMAIL">
			<span id="emailv" class="none">*Direccion de correo inválida</span>
		</div>
		<!--<div class="input-field col s6">
			<textarea name="msg" id="msg" placeholder="Mensaje"></textarea>
			<span id="vmsg" class="none">*Direccion de correo inválido</span>
		</div>-->	
		<center id="top">
			<button style="margin-left: 5px;color: white;" type="submit" class="waves-effect waves-light btn">Iniciar chat</button>
		</center>
		<p class="term">
			Al hacer click en <strong>"Iniciar chat"</strong> estoy aceptando los términos y condiciones
		</p>
	</div>
	<center><span class="foot">powered by diloo</span></center>
</form>
<chat name="chat_tag" id="chat_tag" class="none"></chat>
<script>
	var locals = JSON.parse(window.localStorage.dilooApp);
	console.log(locals);
	var self = this;
        if (locals.ticket){
        	console.log("ya tienes sesion iniciada");
        	setTimeout(function	(){
        		self.root.querySelector('#formfc').setAttribute('class','none');
        		self.root.querySelector('chat').setAttribute('class','show');
        	},200);
        	
        }else{console.log("sin session");}
	self.company ={
		image : ''
	}
	initmessage(){
		$.get({
			"url":"http://192.168.1.7:1337/company?id="+locals.c
		})
		.done(function(data){
			//console.log(data);
			self.company.image = data.image;
			/*
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
			*/
			self.update();
		})
		.fail(function(e){
			console.log(e);
		})
	}
	send (e) {
		e.preventDefault();
		this.nombrev.setAttribute('class','none');
		this.emailv.setAttribute('class','none');
		var name  = this.user.value ;
		var email = this.last_name.value;
		var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if(name.trim().length > 1){
			//nombre válido
			if ( expr.test(email) ){
				//email válido
				diloo.User.login({name:name,email:email},function(resp){
				//	console.log(resp);
					if(resp.status == 200){
						//remove login
						//console.log('+'+name+'+'+email);
						self.root.querySelector('form').setAttribute('class','none');
						self.root.querySelector('chat').setAttribute('class','show');
					}else{
						alert('ha ocurrido un error inesperado ');
					}
				});           
			}else{
				this.emailv.setAttribute('class','show');
			}
		}else{
			this.nombrev.setAttribute('class','show');
		}		
	}
	this.on('mount',function(){
		this.initmessage();
	}) 	
</script>
</login>