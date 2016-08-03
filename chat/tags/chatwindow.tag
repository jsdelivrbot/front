<chatwindow class="chat-larges">    
<bubble name="bubble_tag" company="{company}" onclick={unmounte}></bubble>
<div id="allchat" name="allchat" class="none">
<div id="header" >
    <div class="hbody">
        <div class="userico"></div>
        <span id="name">
            Chat en vivo
        </span>
        <div class="min" onclick={rmclass}>
            <span id="mico">
                <strong>__</strong>
            </span>
        </div>              
    </div>
</div>
    <login name="login_tag" class="none"></login>
</div>
    <script>
        var self = this;
    	var locals = JSON.parse(window.localStorage.dilooApp);
        self.messages = [] ;
        //var chatView=this.tags.chat_tag;
        //chatView.unmount();
            rmclass(){
                this.root.querySelector('#allchat').setAttribute('class','none');
                self.root.setAttribute('style','background-color:none');
                self.root.querySelector('bubble').setAttribute('class','show');
            }
        self.company ={ 
            buble:{
                image : "img/burbuja_0007_chat01.png"
            }
            ,image : ''
            ,connectedMessage : ''
            ,disconnectedMessage : ''
            ,isConnected : true
            ,showMessageIn : 2.5
        }
        unmounte (){
            //console.log(this.tags)
            //var bubble = this.tags.bubble_tag;
            //bubble.unmount();
            self.root.querySelector('#allchat').setAttribute('class','show');
            self.root.querySelector('bubble').setAttribute('class','none');
            self.root.querySelector('login').setAttribute('class','shows');
            self.root.setAttribute('style','background-color:#E8E4D2');
        }
        initmessage(){
            $.get({
                "url":"http://192.168.1.45:1337/company?id="+locals.c
            })
            .done(function(data){
                self.company.image = data.image;
                self.company.isConnected = data.isConnected;
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
        this.on('mount',function(){
            //this.listeners();
            //this.initmessage();
        });
    </script>    
</chatwindow>