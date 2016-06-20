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
$('.date').text(t);
console.log(t);
}