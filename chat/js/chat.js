setTimeout(function(){
    $('.btn-msj').trigger('mouseover');
     setTimeout(function(){
        $('.btn-msj').trigger('mouseout');
     },2000)
},1000)
function addclass(){
	$('#d').removeClass('chat-large');
	$('#d').addClass('chat-larges');
	//$('#d').removeClass('off');
	//$('#d').removeClass('animated zoomOut');
	//$('#d').addClass('animated zoomIn');
	$('.btn-msj').trigger('destroy');
	$('#chat').hide();
	$('.start-chat').removeClass('off');
	$('.btn-msj').trigger('mouseout');
}function rmclass(){
	$('#d').removeClass('chat-larges');
	$('#d').addClass('chat-large');
	//$('#d').removeClass('animated zoomIn');
	//$('#d').addClass('animated zoomOut');
	$('#chat').show();
	$('.start-chat').addClass('off');
	//$('#d').addClass('off');
}
function start(){
	$('.body').load('body.html');
}
function time(){
var tiempo = new Date();
var hora = tiempo.getHours();
var minuto = tiempo.getMinutes();
var t=hora+":"+minuto;
//$('.date').text(t);
return t;
}

 $(function() {
    // Setup form validation on the #register-form element
    $("#fc").validate({
        // Specify the validation rules
        rules: {
            user: "required",
            last_name:"required"
        },      
        // Specify the validation error messages
        messages: {
            user: "Ingrese 1 digito mínimo",
            last_name: "Inrese un correo válido",            
        },
        submitHandler: function(form) {
           console.log("Usuario login");
           
           //start();
           var actions = new Actions();
           actions.login({name:'miguel',email:'maliaga.pantoja@gmail.com'});
        }
    });
});

function msbot(msj){
    var te=time();
    $(".all").append("<div class='bot'><div class='bimg'><img src='img/komo7.jpg'></div><div class='text'>"+msj+"</div><div class='date'>"+te+"</div></div>");
}
function msuser(msj){
    var te = time();
    $(".all").append("<div class='user'><div class='utext'>"+msj+"</div><div class='date u'>"+te+"</div></div>");
}