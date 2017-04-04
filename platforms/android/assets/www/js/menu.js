//Desplegar al hacer clic
$('#menu li').click(function(){ 
    $(this).find('ul').slideToggle('slow'); 
});

$('#nav_mobile').click(function(){  
    $('#oculto').slideToggle('slow');   
});