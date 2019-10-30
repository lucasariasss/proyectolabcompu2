$(function(){
  "use strict";

  //obtener posiscion
  function condicion(){
    if (pos<=0) {
      pos=0;
      $('#pos1').removeClass('activo');
      $('#pos2').removeClass('activo');
      $('#pos3').removeClass('activo');

    }
    if (pos>=3) {
      pos=3;
      $('#pos1').removeClass('activo');
      $('#pos2').removeClass('activo');
      $('#pos3').addClass('activo');
    }
    if (pos==2) {
      $('#pos1').removeClass('activo');
      $('#pos2').addClass('activo');
      $('#pos3').removeClass('activo');
    }
    if (pos==1) {
      $('#pos1').addClass('activo');
      $('#pos2').removeClass('activo');
      $('#pos3').removeClass('activo');
    }
  }
  var pos = 0;

  $('#pos0').on('click', function(){
    pos = 0;
    condicion();
  });
  $('#pos1').on('click', function(){
    pos = 1;
    condicion();
  });
  $('#pos2').on('click', function(){
    pos = 2;
    condicion();
  });
  $('#pos3').on('click', function(){
    pos = 3;
    condicion();
  });

  //funcion de scroll controlado
  var windowHeigth = parseInt($(window).height(), 10);
  var alturaActual = $(window).scrollTop();

  var adentro = 0;
  $('.scroll').on('mouseover', function(){
    adentro = 1;
  });
  $('.scroll').on('mouseout', function(){
    adentro = 0;
  });

  $(window).on('wheel', function(e) {
    var delta = (e.originalEvent.deltaY);
    if (adentro == 0){
      if (delta > 0){//bajando
        pos++;
        alturaActual = windowHeigth * pos;
        $(window).scrollTop(alturaActual);
      }else{//subiendo
        pos--;
        alturaActual = windowHeigth * pos;
        $(window).scrollTop(alturaActual);
      }
    }
    condicion();
  });//scroll controlado con mouse
  $(document).keydown(function(e) {
    switch(e.which) {
      case 38: // subiendo
        pos--;
        alturaActual = windowHeigth * pos;
        $(window).scrollTop(alturaActual);
      break;

      case 40: // bajando
        pos++;
        alturaActual = windowHeigth * pos;
        $(window).scrollTop(alturaActual);
      break;
      default: return;
    }
    e.preventDefault();
    condicion();
  });//scroll controlado con flechas

  //ver bloques
  var ver_mas = $('.ver-mas');
  ver_mas.on('click', function(){
    var opacidad = $(this).parent().parent().parent().children();
    var contenedorDeModulos = $(this).parent().parent().parent().children()[1];
    $(opacidad).fadeOut(200);
    $(contenedorDeModulos).delay(400).fadeIn(300);
  });//ver bloques
  //ver galeria
  var ver_galeria = $('.ver-galeria');
  ver_galeria.on('click', function(){
    var opacidad = $(this).parent().parent().parent().children();
    var contenedorGaleria = $(this).parent().parent().parent().children()[2];
    $(opacidad).fadeOut(200);
    $(contenedorGaleria).delay(200).fadeIn(300);
  });//ver galeria
  //ver informacion
  var ver_info = $('.ver-info');
  ver_info.on('click', function(){
    var contenedorInformacion = $(this).parent().parent();
    var informacion = $(this).parent().parent().parent().children()[0];
    $(contenedorInformacion).fadeOut(200);
    $(informacion).delay(400).fadeIn(300);
  })//ver informacion

  //expansion galerias de servicios
  var imagenes = $('.imagenes');
  var textoGaleria = $('.texto-galeria');
  var galeriaServicios = 0;
  var abierto;
  $.each(textoGaleria, function(i){
    $(textoGaleria[i]).on('click', function(){
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
  })

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
      var expandir = '#'+$(this).attr('id');
      var portada = $(expandir).children()[0];
      var titulo = $(expandir).children()[1];
      var imagen = $(expandir).children()[2];
      var scroll = $(expandir).children()[3];
      if (expandidoS == 0) {//expander
        for (var i = 0; i < servicios.length; i++) {
          $(servicios[i]).removeClass('foto');
          if (expandir==servicios[i]) {
            $(servicios[i]).addClass('atras');
            $(portada).fadeOut(100);
            $(titulo).fadeOut(100);
            $(imagen).fadeIn(500).css({'max-width': '50%'});
            $(scroll).fadeIn(500).css({'max-width': '50%'});
            $(expandir).css({"flex": '100%', 'flex-direction': 'row', 'padding': '5% 5% 5% 3%', 'height': '100%'});
            expandidoS=1;
          }
          else {
            $(servicios[i]).css({'padding': '0', 'border': 'none'})
            $(servicios[i]).children().hide();
            if(clicked<4)
            {
              if(i<4)
              {
                $(servicios[i]).css({"flex": '0 0 0'});
              }
              else
              {
                $(servicios[i]).css({'height': '0'});
              }
            }
            if(clicked>3)
            {
              if(i>3)
              {
                $(servicios[i]).css({"flex": '0 0 0', 'height': '0'});
              }
              else
              {
                $(servicios[i]).css({'height': '0'});
              }
            }
          }
        };
      }else {//contraer
        if (sobreimagen==0) {
          for (var i = 0; i < servicios.length; i++) {
            $(portada).css({'max-width': '100%'});
            $(servicios[i]).css({"flex": '0 0 24.5%', 'flex-direction': 'column', 'padding': '0', 'height': '49%'}).addClass('foto').removeClass('atras');
            var portadas = $(servicios[i]).children()[0]; $(portadas).fadeIn(500);
            var titulos = $(servicios[i]).children()[1]; $(titulos).fadeIn(500);
            var fotos = $(servicios[i]).children()[2]; $(fotos).fadeOut(100);
            var scrolls = $(servicios[i]).children()[3]; $(scrolls).fadeOut(100);
            $(imagenes).hide(500);
            galeriaServicios=0;
            expandidoS=0;
          };
        }
      }
    });
  });//expancion servicios



  //expancion modulos
  var modulos = ['#moduloAlfa', '#moduloBeta', '#moduloGamma'];
  var expandidoM = 0;
  $.each(modulos, function(i){
    $(modulos[i]).on('click', function(i){
      var expandir = '#'+$(this).attr('id');
      var primeraparte = $(expandir).children()[0];
      var imagen = $(primeraparte).children()[0];
      var tituloH4 = $(primeraparte).children()[1];
      var propiedades = $(primeraparte).children()[2];
      var scroll = $(expandir).children()[1];
      var h4 = $(scroll).children()[0];
      if (expandidoM == 0) {//expander
        for (var i = 0; i < modulos.length; i++) {
          $(modulos[i]).removeClass('hover');
          if (expandir==modulos[i]) {
            $(modulos[i]).addClass('atras');
            $(expandir).css({"flex": '100%', 'flex-direction': 'row', 'padding': '5% 5% 5% 3%'});
            $(propiedades).css({'flex-direction': 'row', 'height': '50%', 'display': 'flex'});
            $(tituloH4).hide();
            $(scroll).css({'max-width': '50%'}).show();
            $(h4).animate({'margin-top': '0px'});
            expandidoM=1;
          }
          else {
            $(modulos[i]).css({"flex": '0 0 0', 'padding': '0', 'border': 'none'});
            $(modulos[i]).children().fadeOut(100)
          }
        };
      }else {//contraer
        for (var i = 0; i < modulos.length; i++) {
          var primeraparte = $(modulos[i]).children()[0];
          var imagen = $(primeraparte).children()[0];
          var tituloH4 = $(primeraparte).children()[1];
          var propiedades = $(primeraparte).children()[2];
          var arriba = $(propiedades).children()[0];
          var abajo = $(propiedades).children()[1];
          var textoModulo = $(modulos[i]).children()[1];
          $(imagen).css({'max-width': '100%'}).show();
          $(modulos[i]).css({"flex": '0 0 32%', 'flex-direction': 'column', 'padding': '1.3rem 1.3rem 2rem 1.3rem','border': '1px solid #B5B5B5'}).addClass('hover').removeClass('atras');
          $(propiedades).css({'flex-direction': 'column', 'height': '50%', 'display': 'block'});
          $(arriba).css({'height': '35%'});
          $(abajo).css({'height': '65%'});
          $(tituloH4).fadeIn(500);
          $(primeraparte).show();
          $(textoModulo).hide();
          expandidoM=0;
        };
      }
    });
  });//expancion modulos
});
