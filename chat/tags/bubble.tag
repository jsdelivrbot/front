<bubble>
    <div onclick={unmount} class="btn-msj" id="chat" title={ if company.isConnected == 1 ? company.connectedMessage : company.disconnectedMessage }>
        <img src={ opts.company.buble.image }>
	</div>
    <script>
   /* setTimeout(function(){
         $('#chat').popup({content:opts.company.messagePop});
        setTimeout(function(){ 
            $("#chat").trigger('mouseover');
        },400)
    },1000);  */   

    
        unmount (){
            this.unmount(true);
        }
    </script>
</bubble>