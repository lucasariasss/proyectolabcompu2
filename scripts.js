//funcion para cambiar imagenes de los autos
function selecImagen(c, auto){
    switch (c) {
        case '1000':
            auto.src = "imagenes/formula_1.png";
            break;
        case '1200':
            auto.src = "imagenes/bugatti.png";        
            break;
        case '1400':
            auto.src = "imagenes/porsche.png";
            break;
        case '1600':
            auto.src = "imagenes/masseratti.png";    
            break;
        case '1800':
            auto.src = "imagenes/rally.png";
            break;
        case '2000':
            auto.src = "imagenes/cabriolet.png";        
            break;
        case '2200':
            auto.src = "imagenes/muscle.png";
            break;
        case '2400':
            auto.src = "imagenes/pontiac.png";    
            break;
        case '2600':
            auto.src = "imagenes/x3.png";
            break;
        case '2800':
            auto.src = "imagenes/hummer.png";   
            break;
        case '3000':
            auto.src = "imagenes/flete.png";
            break;
    };
    return auto.src;
}

//validacion de formulario
const formulario = document.querySelector("form");

formulario.addEventListener('submit',function(evento){
    evento.preventDefault();
    //auto 1
    var c1 = document.querySelector('#carroceria1').value;
    var m1 = 745.7 * document.querySelector('#motor1').value;
    var t1 = document.querySelector('#transmision1').value;
    var a1 = t1*m1/c1;
    console.log(c1);
    //auto 2
    var c2 = document.querySelector('#carroceria2').value;
    var m2 = 745.7 * document.querySelector('#motor2').value;
    var t2 = document.querySelector('#transmision2').value;
    var a2 = t2*m2/c2;
    //paso de hp a watt por eso multiplico el valor de los motores por 745.7//canvas

    //CANVAS
    var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');

    var auto1 = new Image();
    selecImagen(c1,auto1);
    var auto2 = new Image();
    selecImagen(c2,auto2);

    //FUNCION DE TIEMPO
    var frame = window.requestAnimationFrame;
    //tiempo inicial igual a cero
    var timer = 0;
    //posiciones iniciales en el eje x
    var p1=10;
    var p2=10;
    var act=0;//variable creada para que el alert se muestre una sola vez

    function tiempo(){
        frame(tiempo);//funciona a 60 fps
        timer = timer+1/60;//mapea los 60 fps a segundos
        if ((p1<850) && (p2<850) ) {
            p1=10 + (a1*timer*timer)/2;
            p2=10 + (a2*timer*timer)/2;
        }else{
            if (act==0) {
                if (a1>a2) {
                    alert('auto 1 ganador')                
                }
                if (a1<a2) {
                    alert('auto 2 ganador')                
                }
                if (a1==a2) {
                    alert('empate')                
                }
                act=1;
            }
        }
        
        //clearRect(x,y,width,heigth)
        //sirve para que se borren las imagenes del fotograma anterior
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.drawImage(auto1,p1,100,150,80);
        ctx.drawImage(auto2,p2,325,150,80);   
    }tiempo();
});


