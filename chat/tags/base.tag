<base>
<form onsubmit={send}> 
	<div class="formulario">				
		<div class="input-field col s6">				 
			<input id="user" name="user" type="text" class="validate" minlength="1" placeholder="NOMBRE">
		</div>
		<div class="input-field col s6">
			<input id="last_name" name="last_name" type="email" class="validate" placeholder="EMAIL">
		</div><br>
		<center>
			<button style="margin-left: 5px;color: white;" type="submit" class="waves-effect waves-light btn">Iniciar chat</button>
		</center><br>
		<p class="term">
			Al hacer click en <strong>"Iniciar chat"</strong> estoy aceptando los términos y condiciones
		</p>
	</div>
	<center><span class="foot">powered by diloo</span></center>
</form>
<script>
	var locals = JSON.parse(window.localStorage.dilooApp);
	var self = this;
	self.company ={
		image : ''
	}
	initmessage(){
		$.get({
			"url":"http://192.168.1.7:1337/company?id="+locals.c
		})
		.done(function(data){
			console.log(data);
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
		var name  = this.user.value ;
		var email = this.last_name.value; 
		var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if(name.trim().length > 1){
			//nombre válido
			if ( expr.test(email) ){
				//email válido
				diloo.User.login({name:name,email:email},function(resp){
					if(resp.status == 200){
						//remove login
						base.unmount();
						//mount chat view
						riot.mount('chat');
					}else{
						alert('ha ocurrido un error inesperado ');
					}
				});           
			}else{
				alert("Error: La dirección de correo " + email + " es incorrecta."); 
			}
		}else{
			alert('nombre demasiado corto');
		}		
	}
	this.on('mount',function(){
		this.initmessage();
	})	
</script>
</base>