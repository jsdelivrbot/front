<login>
    <div class="chat-large" id="d" >
        <form class="form-group" id="fc" style="height: 100%;">
            <div id="header" class="col s12 m2">
                <div class="hbody">
                    <div class="userico">
                        <img src="img/msj.png">
                    </div>
                    <span id="name">Texto - nombre usuario</span>
                    <div class="min" onclick="rmclass();">
                        <span id="mico">
                            <strong>__</strong>
                        </span>
                    </div> 				
                </div>
            </div>
            <div class="body">
                <div class="formulario">				
                    <div class="input-field col s6">					 
                        <input id="user" name="user" type="text" class="validate" minlength="1" placeholder="NOMBRE">
                    </div>
                    <div class="input-field col s6">
                        <input id="last_name" name="last_name" type="EMAIL" class="validate" placeholder="EMAIL">
                    </div><br>
                    <center>
                        <button style="margin-left: 5px;color: white;" type="submit" class="waves-effect waves-light btn">Iniciar chat</button>
                    </center><br>
                    <p class="term">Al hacer click en <strong>"Iniciar chat"</strong> estoy aceptando los términos y condiciones </p>
                </div><br>
                <center><span class="foot">powered by diloo</span></center>
            </div>
        </form>
    </div>
    <div id="chat" onclick="{ addclass }" class="btn-msj" data-content="Bienvenido a Olo, ¿Tienes alguna duda?">
    <script>
        addclass(){
            $('#d').removeClass('chat-large');
            $('#d').addClass('chat-larges');
            $('.btn-msj').trigger('destroy');
            $('#chat').hide();
            $('.start-chat').removeClass('off');
            $('.btn-msj').trigger('mouseout');    
        }
        this.on('updated',function(){
            //setting popup
            $('.btn-msj',this.root).popup({position: 'right center'}); 
            //autoshow popup
            setTimeout(function(){
                $('.btn-msj',this.root).trigger('mouseover');
                setTimeout(function(){
                    $('.btn-msj').trigger('mouseout');
                },2000)
            },1000)            
        });
        
    </script>
    <style scoped>
         .btn-msj{
            border-radius: 50%;
            bottom: 22px;
            font-size: 12px;
            line-height: 18px;
            background-color: skyblue;
            text-align: center;
            color: #fff;
            position: fixed;
            width: 48px;
            height: 48px;
            right: 21px;
            cursor: pointer;
            background-image:url("../img/msj.png");
            background-size:44px 44px;
            background-position:center center;        
        }
    </style>
</login>