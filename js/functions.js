$(function(){
  "use strict";
  var width = parseInt($(window).width(), 10);
  var windowHeigth = parseInt($(window).height(), 10);

  function resize(){
    width = parseInt($(window).width(), 10);
    windowHeigth = parseInt($(window).height(), 10);
  }

  //menu hamburguesa
  var burger = $('.burger');
  var contenedor_barra = $('.contenedor-barra');
  var menuAbierto = 0;
  if(width>768){
    contenedor_barra.show();
  }
  burger.on('click', function(){
    if (menuAbierto == 0) {
      contenedor_barra.show(500);
      menuAbierto = 1;
    }else {
      contenedor_barra.hide(500);
      menuAbierto = 0;
    }
  });//menu hamburguesa
  //comprobar posiscion
  var pos = 0;
  function condicion(){
    if (pos<=0) {
      pos=0;
      $('#pos1').removeClass('activo');
    }
    if (pos>=1) {
      $('#pos1').addClass('activo');
    }
  }//obtener posiscion
  $('#pos0').on('click', function(){
    pos = 0;
    barraBurger();
    condicion();
    if(width<768){
      $('.logo').fadeOut(500);
    }
  });
  $('#pos1').on('click', function(){
    pos = 1;
    barraBurger()
    condicion();
  });

  function barraBurger(){
    resize();
    if(width<768){
      logo();
      contenedor_barra.hide(500);
      menuAbierto = 0;
    }
  }

  function logo() {
    alturaActual = $(window).scrollTop();
    windowHeigth = parseInt($(window).height(), 10);
    if (width<=440 && alturaActual<=(windowHeigth/2)){
      $('.logo').fadeOut(500);
    }else{
      $('.logo').fadeIn(500);
    }
  }

  //funcion de scroll controlado
  var alturaActual = $(window).scrollTop();

  var adentro = 0;
  $('.scroll').on('mouseover', function(){
    adentro = 1;
  });
  $('.scroll').on('mouseout', function(){
    adentro = 0;
  });

  var cont = 0;
  var intTiempo = setInterval(contador,1);
  function contador() {
    cont++;
  }

  function bajando() {
    pos++;
    alturaActual = windowHeigth * pos;
    $(window).scrollTop(alturaActual);
  }
  function subiendo() {
    pos--;
    alturaActual = windowHeigth * pos;
    $(window).scrollTop(alturaActual);
  }

  $(window).on('wheel', function(e) {
    resize();
    if(cont>300){
      cont=0;
      width = parseInt($(window).width(), 10);
      windowHeigth = parseInt($(window).height(), 10);
      var delta = (e.originalEvent.deltaY);
      if (adentro == 0){
        if (delta > 0){//bajando
          bajando();
        }else{//subiendo
          subiendo();
        }
      }
      logo();
      condicion();
    }
  });//scroll controlado con mouse,
  $(document).keydown(function(e) {
    resize();
    switch(e.which) {
      case 38: // subiendo
        subiendo();
      break;

      case 40: // bajando
        bajando();
      break;
      default: return;
    }
    e.preventDefault();
    logo();
    condicion();
  });//scroll controlado con flechas
  $(window).on("scrollstart",function(){
    resize();
    logo();
  });
  //ver bloques
  var ver_mas = $('.ver-mas');
  ver_mas.on('click', function(){
    logo();
    var opacidad = $(this).parent().parent();
    var contenedorDeModulos = $(this).parent().parent().parent().children()[3];
    $(opacidad).fadeOut(200);
    $(contenedorDeModulos).delay(400).fadeIn(300);

  });//ver bloques
  
  //ver galeria
  var ver_galeria = $('.ver-galeria');
  ver_galeria.on('click', function(){
    logo();
    var opacidad = $(this).parent().parent();
    var contenedorGaleria = $(this).parent().parent().parent().children()[4];
    $(opacidad).fadeOut(200);
    $(contenedorGaleria).delay(200).fadeIn(300);
  });//ver galeria

  //ver informacion
  var ver_info = $('.ver-info');
  ver_info.on('click', function(){
    logo();
    var opacidad = $(this).parent().parent();
    var informacion = $(this).parent().parent().parent().children()[2];
    $(opacidad).fadeOut(200);
    $(informacion).delay(400).fadeIn(300);
  })//ver informacion

  //ver preguntas frecuentes
  var ver_preguntas = $('.ver-preguntas');
  ver_preguntas.on('click', function(){
    logo();
    var opacidad = $(this).parent().parent();
    var preguntas = $(this).parent().parent().parent().children()[5];
    $(opacidad).fadeOut(200);
    $(preguntas).delay(400).fadeIn(300);
  })//ver preguntas frecuentes

  //expancion modulos
  var modulos = ['#moduloAlfa', '#moduloBeta', '#moduloGamma'];
  var expandidoM = 0;
  $.each(modulos, function(i){
    $(modulos[i]).on('click', function(i){
      logo();
      width = parseInt($(window).width(), 10);
      windowHeigth = parseInt($(window).height(), 10);
      var expandir = '#'+$(this).attr('id');
      for(var i = 0; i < modulos.length; i++){
        var primeraparte = $(modulos[i]).children()[0];
        var tituloH4 = $(primeraparte).children()[1];
        var textoModulo = $(modulos[i]).children()[1];

        if (expandidoM == 0) {//expander
          $(modulos[i]).removeClass('hover').removeClass('reducida');
          if (expandir==modulos[i]) {
            $(modulos[i]).addClass('atras').addClass('caja-modulos');
            $(tituloH4).hide();
            $(textoModulo).show();
          }else {
            $(primeraparte).hide();
            if(width<768){
              $(modulos[i]).addClass('no-height');
            }else{
              $(modulos[i]).addClass('no-width');
            }
          }
          $(modulos[i]).removeClass('columnas-3');
        }else {//contraer
          $(modulos[i]).addClass('columnas-3').addClass('reducida').addClass('hover').removeClass('atras').removeClass('no-width').removeClass('no-height').removeClass('caja-modulos');
          $(tituloH4).show();
          $(primeraparte).show();
          $(textoModulo).hide();
        }
      }
      if(expandidoM==0){
        expandidoM=1;
      }else{
        expandidoM=0;
      }
    });
  });//expancion modulos
});
