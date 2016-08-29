function WidgetChat(){
	var src ="";
	return{
		setStyle: function setstyle(data){
			if (data.type=="t0") {
				src="https://s3-sa-east-1.amazonaws.com/diloo-assets/widget/burbuja01_48.png";
			}else if(data.type=="t1"){
				src="https://s3-sa-east-1.amazonaws.com/diloo-assets/widget/burbuja02_48.png";
			}else{
				src="https://s3-sa-east-1.amazonaws.com/diloo-assets/widget/burbuja03_48.png";
			}
			document.querySelector('#diloo-bubble').setAttribute('src',src);
			document.querySelector('#diloo-message').innerHTML(data.message);
		}
	}
}
var widget = new WidgetChat();