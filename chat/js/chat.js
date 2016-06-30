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
 $(function() {
    // Setup form validation on the #register-form element
    $("#fca").validate({
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
           event.preventDefault();
           $('base').addClass('off');
           setTimeout(function(){
            base.unmount();
        },2000)
           
           riot.mount('chat');
           var actions = new Actions();
           var usr = $('#user').val();
           //var usr = document.getElementById('user').value;
           //var lastname = document.getElementById('last_name').value;
           var lastname = $('#last_name').val();
           console.log(usr + "--" + lastname);
           actions.login({name:usr,email:lastname});

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