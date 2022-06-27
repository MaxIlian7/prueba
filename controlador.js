$(document).ready(function(){
    //validacion
    $("#formu").validate({
        //maxlength: 4  email: true  number: true
        rules: {
          na: {required: true, minlength: 2},
          msj: {required: true, minlength: 5},
          correo: {email: true, required: true}
        },
        messages:{ //<div class="alert alert-danger mood" role="alert"></div>
            na: {required: '<div class="alert alert-danger mood" role="alert">Campo requerido</div>', minlength: '<div class="alert alert-danger mood" role="alert">Minimo de caracteres 2</div>'},
            msj: {required: '<div class="alert alert-danger mood" role="alert">Campo requerido</div>', minlength: '<div class="alert alert-danger mood" role="alert">Minimo 5 caracters</div>'},
            correo: {required: '<div class="alert alert-danger mood" role="alert">Campo requerido</div>', email: '<div class="alert alert-danger mood" role="alert">Debe se un correo elextronico valido</div>'}
        }
    });

    $("#compra").validate({
        //maxlength: 4  email: true  number: true
        rules: {
          nya: {required: true, minlength: 2},
          cod: {required: true, minlength: 3, maxlength: 4, number: true},
          correo: {email: true, required: true},
          canti: {required: true, minlength: 1, number: true}
        },
        messages:{ //<div class="alert alert-danger mood" role="alert"></div>
            nya: {required: '<div class="alert alert-danger mood" role="alert">Campo requerido</div>', minlength: '<div class="alert alert-danger mood" role="alert">Minimo de caracteres 2</div>'},
            cod: {number: '<div class="alert alert-danger mood" role="alert">Los caracteres deben ser numeros</div>', maxlength: '<div class="alert alert-danger mood" role="alert">Maximo 4 caracters</div>', required: '<div class="alert alert-danger mood" role="alert">Campo requerido</div>', minlength: '<div class="alert alert-danger mood" role="alert">Minimo 3 caracters</div>'},
            correo: {required: '<div class="alert alert-danger mood" role="alert">Campo requerido</div>', email: '<div class="alert alert-danger mood" role="alert">Debe se un correo elextronico valido</div>'},
            canti: {number: '<div class="alert alert-danger mood" role="alert">Los caracteres deben ser numeros</div>', required: '<div class="alert alert-danger mood" role="alert">Campo requerido</div>', minlength: '<div class="alert alert-danger mood" role="alert">Minimo 1 caracters</div>'}
        }
    });
    
    //p.pal
    $('#1_p').hide()
    $('#home').on("click", function(){
        $('#productos').hide()
        $('#info').hide()
        $('#1_p').hide()
        $('#inicio').show()
    })
    
    //Productos
    $('#pro').on("click", function(){
        $('#inicio').hide()
        $('#info').hide()
        $('#1_p').hide()
        $('#productos').show()
        m_prod()
    })

    //categoria
    const cal = "Calzado"
    const re = "Remeras"
    const oc = "Ocio"
    const pan = "Pantalones"
    const com = "Comida"
    $('#calzado').on("click", {cat: cal}, categoria)
    $('#remera').on("click", {cat: re}, categoria)
    $('#ocio').on("click", {cat: oc}, categoria)
    $('#pantalon').on("click", {cat: pan}, categoria)
    $('#comida').on("click", {cat: com}, categoria)

    //info
    $('#qui').on("click", function(){
        $('#inicio').hide()
        $('#1_p').hide()
        $('#productos').hide()
        $('#info').show()
        m_info()
    })
})

var m_info = function(){
    $.ajax({
        url : 'json/info.json',
        type: 'GET',
        dataType : 'json',
        success : function(json) {
            console.log(json)
            $('#info').empty()
            for(i=0; i < json.length; i++){
                console.log(i)
                if(i == 0){
                    var pro = '<div class="col-12"><div class="card"><div class="card-body fo"><h5 class="card-title">'+json[i].nomb+'</h5><p class="card-text">'+json[i].info+'</p></div></div></div>'
                    $('#info').append(pro)
                } else if(i<=3 && i != 6){
                    var pro = '<div class="col-4"><div class="card"><img src="'+json[i].dir_i+'" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">'+json[i].nomb+'</h5><p class="card-text">'+json[i].info+'</p></div></div></div>'
                    $('#info').append(pro)
                } else if (i == 6){
                    var pro = '<div class="col-12"><div class="card"><div class="card-body"><h5 class="card-title">'+json[i].nomb+'</h5><p class="card-text">'+json[i].info+'</p></div></div></div>'
                    $('#info').append(pro)
                } else {
                    var pro = '<div class="col-6"><div class="card"><img src="'+json[i].dir_i+'" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">'+json[i].nomb+'</h5><p class="card-text">'+json[i].info+'</p></div></div></div>'
                    $('#info').append(pro)
                }
            }
        },
        error : function(xhr, status) {
            alert('Problema con conexion');
        },
    })
}

function categoria(event){
    var cate = event.data.cat
    $('#inicio').hide()
    $('#info').hide()
    $('#1_p').hide()
    $('#productos').show()
    $.ajax({
        url : 'json/productos.json',
        type: 'GET',
        dataType : 'json',
        success : function(json) {
            console.log(json)
            $('#productos').empty()
            for(i=0; i < json.length; i++){
                if(cate == json[i].cat){
                    var pro = "<div class='col-3'><div class='card'><a href='#' onclick='productos1("+json[i].id+")'><img src='"+ json[i].dir+"' class='card-img-top'></a><div class='card-body'><h5 class='card-title'>"+json[i].nom+ " $"+json[i].precio+ "</h5><p class='card-text'>"+json[i].desc+"</p></div></div></div>"
                    $('#productos').append(pro)
                }
            }
        },
        error : function(xhr, status) {
            alert('Problema con conexion');
        },
    })
}

function productos1(ids){
    $('#productos').hide()
    $('#inicio').hide()
    $('#1_p').show()
    $.ajax({
        url : 'json/productos.json',
        type: 'GET',
        dataType : 'json',
        success : function(json) {
            for(i=0; i < json.length; i++){
                if(json[i].id == ids){
                    console.log(json[i])
                    $('#img_1p').attr("src", "")
                    $('#img_1p').attr("src", json[i].dir[0])
                    $('#ti_1p').html(json[i].nom+" $"+json[i].precio)
                    $('#des_1p').html(json[i].desc)
                    $('#exampleModalLabel').html(json[i].nom)
                    $('#row_img').empty()
                    for(k=0; k<json[i].dir.length; k++){
                        var pp = json[i].dir[k].split("/")
                        pp = pp[1].split(".")
                        pp = "'"+pp[0]+"'"
                        var prodd = '<div class="lin"><img class="lin-img" src="'+json[i].dir[k]+'" onclick="cambiar('+pp+')"></div>' 
                        $('#row_img').append(prodd)
                        
                    }
                }
            }
        },
        error : function(xhr, status) {
            alert('Problema con conexion');
        },
    })
}

function cambiar (cam){
    cam = "prod/"+cam+".jpg"
    $('#img_1p').attr("src", "")
    $('#img_1p').attr("src", cam)
}

function m_prod(event){
    $.ajax({
        url : 'json/productos.json',
        type: 'GET',
        dataType : 'json',
        success : function(json) {
            console.log(json)
            $('#productos').empty()
            for(i=0; i < json.length; i++){
                var pro = "<div class='col-3'><div class='card'><a href='#' onclick='productos1("+json[i].id+")'><img src='"+ json[i].dir[0]+"' class='card-img-top'></a><div class='card-body'><h5 class='card-title'>"+json[i].nom+ " $"+json[i].precio+ "</h5><p class='card-text'>"+json[i].desc+"</p></div></div></div>"
                $('#productos').append(pro)
            }
        },
        error : function(xhr, status) {
            alert('Problema con conexion');
        },
    })
}
