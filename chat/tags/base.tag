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
	send (e) {
		e.preventDefault();
		var name  = this.user.value ;
		var email = this.last_name.value; 
		console.log(name,email)
		var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if(name.trim().length > 1){
			//nombre válido
			if ( expr.test(email) ){
				//email válido
				var actions = new Actions();
				actions.login({name:name,email:email},function(resp){
					if(resp.status == 200){
						base.unmount();
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
</script>
</base>