<chat>
<div class="start-chat">
	<div class="all" id="chat-all">

		<div each = { messages } class={type=='reciber' ? 'bot':'user' } if={type=='reciber'}>
			<div class="bimg">
				<img src="img/komo7.jpg">
			</div>
			<div class="text">
				{ body }
			</div>
			<div class="date"></div>				
		</div>	

	<div each = { messages } class={type=='reciber' ? 'bot':'user' } if={type='nuevoSender'}>
			<div class="utext">
				{ body } 
			</div>
			<div class="date"></div>				
	</div>

	</div>
	<div class="foot-msj">
		<input type="text" id="msm" placeholder="escribe tu mensaje"></input><button style="position: absolute;" onclick="add();">dar</button>
	</div>
	<script type="text/javascript">
		var self = this
		self.messages=[{
			ticket: "new" 
			,type:	"reciber"
			,body:	"test sxs"
		},
		{
			ticket: "new" 
			,type:	"reciber"
			,body:	"test ss"	
		},
		{
			ticket: "new" 
			,type:	"reciber"
			,body:	"test ss"		
		}];
		function add(){
			var a = $('#msm').val();
			messages.push({ ticket: 1, type: "reciber",body: a});
		}
	</script>
</div>
</chat>