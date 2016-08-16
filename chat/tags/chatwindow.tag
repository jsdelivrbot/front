<chatwindow class="chat-larges">
<div class="msj-pop" id="pmsj">
            <span>{ this.company.messagePop } </span>
            <div class="close" onclick={ hidepop }>x</div>
</div>    
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
    <style>
         #pmsj{
           background-color: white;
            width: 150px;
            height: 48px;
            border-radius: 5px;
            position: fixed;
            left: 75px;
            padding: 14px;
            bottom: 22px;
        }
        .close{    
            cursor:pointer;
            width: 12px;
            height: 12px;
            background-color: white;
            border-radius: 50%;
            position: absolute;
            right: 3px;
            text-align: center;
            vertical-align: middle;
            top: 0px;
        }
    </style>
    <script>
        var self = this;
        var locals = JSON.parse(window.localStorage.dilooApp);
        self.messages = [] ;
         rmclass(){
                this.root.querySelector('#allchat').setAttribute('class','none');
                self.root.setAttribute('style','background-color:none');
                self.root.querySelector('bubble').setAttribute('class','show');
                self.root.querySelector('#pmsj').setAttribute('class','show');
            }
        start (){
            var cid = JSON.parse(window.localStorage.dilooApp);
            $.ajax({
                    type    : 'GET',
                    url     : 'http://40.76.4.149:8000/company/widget/getOne?companyId='+cid.c,
                    dataType: 'application/json'     
                }).complete(function(response) {
                        var msj = JSON.parse(response.responseText);
                        var typem = JSON.parse(msj.response)[0];
                        console.log(typem);
                    
                    var imgurl="";
                    if (typem.fields.type=='t0') {
                        imgurl = "https://s3-sa-east-1.amazonaws.com/diloo-assets/widget/burbuja01_48.png";
                    }else if(typem.fields.type=='t1'){
                        imgurl = "https://s3-sa-east-1.amazonaws.com/diloo-assets/widget/burbuja02_48.png";
                    }else if(typem.fields.type=='t2'){
                        imgurl = "https://s3-sa-east-1.amazonaws.com/diloo-assets/widget/burbuja03_48.png";
                    }
                    self.company ={ 
                            buble:{
                                image : imgurl
                            }
                            ,image          : ''
                            ,connectedMessage : ''
                            ,disconnectedMessage : ''
                            ,isConnected    : true
                            ,showMessageIn  : 2.5
                            ,messagePop     : typem.fields.message
                        } 
                    self.update();
                });
               // console.log("---"+imgurl);
               
           
        }
        hidepop(){
            self.root.querySelector('#pmsj').setAttribute('class','none');
        }
        unmounte (){
            //console.log(this.tags)
            //var bubble = this.tags.bubble_tag;
            //bubble.unmount();¿
            self.root.querySelector('#allchat').setAttribute('class','show');
            self.root.querySelector('bubble').setAttribute('class','none');
            self.root.querySelector('login').setAttribute('class','shows');
            self.root.setAttribute('style','background-color:#E8E4D2');
            $("#chat").trigger('destroy');
            self.root.querySelector('#pmsj').setAttribute('class','none');
        }
        initmessage(){
            $.get({
                "url":"http://192.168.1.7:1337/company?id="+locals.c
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
            this.start()
            //this.listeners();
            //this.initmessage();
        });
    </script>    
</chatwindow>