<chat>
<div class="start-chat">
	<div class="all" id="chat-all">
        <div each="messages" class={ type == 'nuevoSender'?'bot':'user'} >
            <div class="wrapper" if={type=='nuevoSender'}>
                <div class="bimg">
                    <img src="img/komo7.jpg">
                </div>
                <div class="text">
                    { body }
                </div>
                <div class="date">
                </div>                
            </div> 
            
            <div class="wrapper" if={type=='reciber'}>
                <div class="utext">
                    { body } 
                </div>                
            </div>
        </div>
	</div>
    <div class="foot-msj">
        <input type="text" id="msm" placeholder="escribe tu mensaje" onkeydown={ sendMessage }></input>
    </div>
</div>
<script>
    this.messages = [] ;
    sendMessage(e){
        
    }
</script>  
<style>

</style>
</chat>