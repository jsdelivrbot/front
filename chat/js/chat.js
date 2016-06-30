setTimeout(function(){
    $('.btn-msj').trigger('mouseover');
     setTimeout(function(){
        $('.btn-msj').trigger('mouseout');
     },2000)
},1000)
function addclass(){
	$('#d').removeClass('chat-large');
	$('#d').addClass('chat-larges');
	$('.btn-msj').trigger('destroy');
	$('#chat').hide();
	$('.start-chat').removeClass('off');
	$('.btn-msj').trigger('mouseout');
}function rmclass(){
	$('#d').removeClass('chat-larges');
	$('#d').addClass('chat-large');
	$('#chat').show();
	$('.start-chat').addClass('off');
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
function msbot(msj){
    var te=time();
    $(".all").append("<div class='bot'><div class='bimg'><img src='img/komo7.jpg'></div><div class='text'>"+msj+"</div><div class='date'>"+te+"</div></div>");
}
function msuser(msj){
    var te = time();
    $(".all").append("<div class='user'><div class='utext'>"+msj+"</div><div class='date u'>"+te+"</div></div>");
}