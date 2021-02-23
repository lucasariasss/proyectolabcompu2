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
  //obtener posiscion
  var pos = 0;
  function condicion(){
    if (pos<=0) {
      pos=0;
      $('#pos1').removeClass('activo');
      $('#pos2').removeClass('activo');
      $('#pos3').removeClass('activo');
      $('#pos4').removeClass('activo');
    }
    if (pos>=4) {
      pos=4;
      $('#pos1').removeClass('activo');
      $('#pos2').removeClass('activo');
      $('#pos3').removeClass('activo');
      $('#pos4').addClass('activo');
    }
    if (pos==3) {
      $('#pos1').removeClass('activo');
      $('#pos2').removeClass('activo');
      $('#pos3').addClass('activo');
      $('#pos4').removeClass('activo');
    }
    if (pos==2) {
      $('#pos1').removeClass('activo');
      $('#pos2').addClass('activo');
      $('#pos3').removeClass('activo');
      $('#pos4').removeClass('activo');
    }
    if (pos==1) {
      $('#pos1').addClass('activo');
      $('#pos2').removeClass('activo');
      $('#pos3').removeClass('activo');
      $('#pos4').removeClass('activo');
    }
  }//obtener posiscion
  $('#pos0').on('click', function(){
    pos = 0;
    barraBurger()
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
  $('#pos2').on('click', function(){
    pos = 2;
    barraBurger()
    condicion();
  });
  $('#pos3').on('click', function(){
    pos = 3;
    barraBurger()
    condicion();
  });
  $('#pos4').on('click', function(){
    pos = 4;
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

  //expansion galerias de servicios
  var imagenes = $('.imagenes');
  var textoGaleria = $('.texto-galeria');
  var galeriaServicios = 0;
  var abierto;
  $.each(textoGaleria, function(i){
    $(textoGaleria[i]).on('click', function(){
      width = parseInt($(window).width(), 10);
      windowHeigth = parseInt($(window).height(), 10);
      for(var i = 0; i < textoGaleria.length; i++){
        if(this == textoGaleria[i]){
          $(imagenes[i]).show(500);
          if(galeriaServicios==0){
            galeriaServicios=1;
          }else{
            if(this == abierto){
              $(imagenes[i]).hide(750);
              galeriaServicios=0;
            }else{
              galeriaServicios=1;
            }
          }
          abierto=textoGaleria[i];
        }else{
          $(imagenes[i]).hide(750);
        }
      }
    })
  })//expansion galerias de servicios

  //expancion servicios
  var sobreimagen = 0;
  $('.galeria').on('mouseover', function(){
    sobreimagen = 1;
  });
  $('.galeria').on('mouseout', function(){
    sobreimagen = 0;
  });

  var servicios = ['#factibilidades', '#proyectos', '#ejecucion', '#direccionTecnica', '#obras', '#concursos', '#relevamientos', '#desarrollo'];
  var expandidoS = 0;
  $.each(servicios, function(i){
    var clicked = i;
    $(servicios[i]).on('click', function(i){
      width = parseInt($(window).width(), 10);
      windowHeigth = parseInt($(window).height(), 10);
      logo();
      var expandir = '#'+$(this).attr('id');
      for (var i = 0; i < servicios.length; i++) {
        var portada = $(servicios[i]).children()[0];
        var titulo = $(servicios[i]).children()[1];
        var galeria = $(servicios[i]).children()[2];
        var scroll = $(servicios[i]).children()[3];
        if (expandidoS == 0) {//expander
            $(servicios[i]).removeClass('foto');
            if (expandir==servicios[i]) {
              $(servicios[i]).addClass('atras').addClass('caja-servicios').delay(500).removeClass('columnas-4');
              $(portada).fadeOut(100);
              $(titulo).fadeOut(100);
              $(galeria).fadeIn(100);
              $(scroll).delay(350).fadeIn(150);
            }
            else {
              $(servicios[i]).children().hide().delay(500).removeClass('columnas-4');
              if(width<768){
                if(clicked%2==0){
                  $(servicios[clicked+1]).addClass('no-width');
                }else{
                  $(servicios[clicked-1]).addClass('no-width');
                }
                $(servicios[i]).addClass('no-height');
              }else{
                if(clicked<4){
                  if(i<4){
                    $(servicios[i]).addClass('no-width');
                  }else{
                    $(servicios[i]).addClass('no-height');
                  }
                }else{
                if(i>3){
                  $(servicios[i]).addClass('no-width').delay(500).addClass('no-height');
                }else{
                  $(servicios[i]).addClass('no-height');
                }
              }
              }
            }
        }else {//contraer
          if (sobreimagen==0) {
            $(servicios[i]).removeClass('no-height').removeClass('no-width').addClass('columnas-4').addClass('foto').removeClass('atras').removeClass('caja-servicios');
            $(titulo).fadeIn(500);
            $(galeria).fadeOut(100);
            $(scroll).fadeOut(100);
            $(portada).delay(300).fadeIn(300);
            galeriaServicios=0;
          }
        }
      }
      if (expandidoS==0) {
        expandidoS=1;
      }else{
        expandidoS=0;
      }
    });
  });//expancion servicios

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
