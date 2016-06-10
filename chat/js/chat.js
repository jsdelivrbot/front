setTimeout(function(){
    $('.btn-msj').trigger('mouseover');
     setTimeout(function(){
        $('.btn-msj').trigger('mouseout');
     },3000)
},2000)
function addclass(){
	$('#d').removeClass('chat-large');
	$('#d').addClass('chat-larges');
	$('#d').removeClass('animated slideInDown');
	$('#d').addClass('animated slideInUp');
	$('.btn-msj').trigger('destroy');
	$('#chat').hide();
}function rmclass(){
	$('#d').removeClass('chat-larges');
	$('#d').addClass('chat-large');
	$('#d').removeClass('animated slideInUp');
	$('#d').addClass('animated slideInDown');
	$('#chat').show();
}