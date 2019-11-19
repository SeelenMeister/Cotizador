$(document).ready(function() {
    console.log( "Js ready!" );
    $("#select1").imagepicker();
    $("#color").imagepicker();
    $('#enviar2a').prop('disabled', true);
    $('#enviar2b').prop('disabled', true);

    $('#inp1a').keyup(function(e){
        area1();
    })

    $('#inp2a,#inp2b').keyup(function(e){
        area2();
    })

});

// CALCULO DEL PRECIO POR METRO CUADRADO
function costo(x){
    let costo = 30; // COSTO POR METRO CUADRADO
    let fijo = 1000; // COSTO FIJO BASE
    let resultado = fijo + x * costo;
    return resultado;
}

$(document).on('click','#inp1a', function(){
    area1();
});

$(document).on('click','#inp2a,#inp2b', function(){
    area2();
});

$(document).on('click','#enviar1', function(){
    paso1();
});

$(document).on('click','#enviar3', function(){
    let forma = $("#select1").val();
    let metros = '';
    let precio = '';
    if(forma == 1){
        metros = area1();
        precio = costo(metros).toFixed(2);
        console.log(precio);
    } else {
        metros = area2();
        precio = costo(metros).toFixed(2);
        console.log(precio);
    }
    finalShow(precio);

});

$(document).on('click','#enviar', function(){
    var select1 = $("#select1").val();
    var select2 = $("#select2").val();
    var resultado = suma(select1, select2);
    $("#resultado").html(resultado);
});

function suma(x,y){
    var suma = parseInt(x) + parseInt(y);
    return suma;
}

function paso1(){
    let forma = $("#select1").val();
    if(forma == 1){
        $('#opt1').show();
        $('#opt2').hide();
    }else{
        $('#opt2').show();
        $('#opt1').hide();
    }
}

function area1(){
    let input1 = $('#inp1a').val();
    let radio = input1 / 2;
    let radio2 = radio*radio;
    let pi = 3.14;
    let area1 = radio2*pi;
    let area1f = area1.toFixed(2);
    let resultado = `
    <p>Tu pileta tendrá ${area1f} metros cuadrados!</p>
    `;
    let vacio = ``;
    if(area1 == 0 || !area1){
        $('#enviar2a').prop('disabled', true);
        $('#alerta1').show();
        $('#res1').html(vacio);
    }else{
        $('#enviar2a').prop('disabled', false);
        $('#alerta1').hide();
        $('#res1').html(resultado);
        return area1f;
    }
};

function area2(){
    let input1 = $('#inp2a').val();
    let input2 = $('#inp2b').val();
    let area2 = input1*input2;
    let area2f = area2.toFixed(2);
    if(area2 < 0){
        area2f = area2f*-1;
    }
    let resultado = `
    <p>Tu pileta tendrá ${area2f} metros cuadrados!</p>
    `;
    let vacio = ``;
    if(area2 == 0 || !area2){
        $('#enviar2b').prop('disabled', true);
        $('#alerta2').show();
        $('#res2').html(vacio);
    }else{
        $('#enviar2b').prop('disabled', false);
        $('#alerta2').hide();
        $('#res2').html(resultado);
        return area2f;
    }
};

function finalShow(x){
    let forma = $('#select1').val();
    let color = $('#color').val();
    let final = '';
    let precio = x;
    let precio2 = '';
    if(forma == 1){
        $('#forma1').show();
        $('#forma2').hide();
        precio2 = new Intl.NumberFormat().format(precio)
        final += `
        <p>Total: $ ${precio2} IVA INCLUIDO!</p>
        `
        $('#final').html(final);
    }else{
        $('#forma2').show();
        $('#forma1').hide();
        precio2 = new Intl.NumberFormat().format(precio)
        final += `
        <p>Total: $ ${precio2} IVA INCLUIDO!</p>
        `
        $('#final').html(final);
    }
    if(color == 1){
        $('#color1').show();
        $('#color2').hide();
        $('#color3').hide();
    } else if(color == 2) {
        $('#color2').show();
        $('#color1').hide();
        $('#color3').hide();
    } else {
        $('#color3').show();
        $('#color1').hide();
        $('#color2').hide();
    }
}
