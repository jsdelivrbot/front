<bubble>
    <div onclick={unmount} class="btn-msj" id="chat" title={ if company.isConnected == 1 ? company.connectedMessage : company.disconnectedMessage }>
        <img src={ opts.company.buble.image }>
	</div>
    <style>
        bubble {
            position: fixed;
            width: 48px;
            height: 48px;
            right: 21px;
            bottom:22px;        
        }    
    </style>
    <script>
        unmount (){
            this.unmount(true);
        }
    </script>
</bubble>