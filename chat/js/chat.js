setTimeout(function(){
    $('.btn-msj').trigger('mouseover');
     setTimeout(function(){
        $('.btn-msj').trigger('mouseout');
     },3000)
},2000)
function addclass(){
	$('#d').removeClass('chat-large');
	$('#d').addClass('chat-larges');
	$('#d').removeClass('off');
	$('#d').removeClass('animated zoomOut');
	$('#d').addClass('animated zoomIn');
	$('.btn-msj').trigger('destroy');
	$('#chat').hide();
}function rmclass(){
	$('#d').removeClass('chat-larges');
	$('#d').addClass('chat-large');
	$('#d').removeClass('animated zoomIn');
	$('#d').addClass('animated zoomOut');
	$('#chat').show();
	setTimeout(function(){
		$('#d').addClass('off');
	},400);
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