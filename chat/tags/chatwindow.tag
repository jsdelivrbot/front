<chatwindow>
    <bubble company="{company}"></bubble>
    <script>
        var self = this;
    	var locals = JSON.parse(window.localStorage.dilooApp);
        self.messages = [] ;
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
        initmessage(){
            $.get({
                "url":"http://localhost:1337/company?id="+locals.c
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