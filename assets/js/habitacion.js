const imagenes = {

    sencilla:[
    "images/sencillo.png",
    "images/sencillo2.png",
    "images/tv.png",
    "images/balcon.png"
],

    doble:[
        "images/doble1.png",
		"images/cuarto2.png",
        "images/baño2.png"
    ],

    suite:[
        "images/suite1.png",
        "images/baño3.png",
        "images/sala.png",
        "images/jacuzzi.png"
    ]

};

let indice = {

    sencilla:0,
    doble:0,
    suite:0

};

function cambiarImagen(tipo,direccion){

    indice[tipo]+=direccion;

    if(indice[tipo] < 0){

        indice[tipo]=imagenes[tipo].length-1;

    }

    if(indice[tipo] >= imagenes[tipo].length){

        indice[tipo]=0;

    }

    document.getElementById(
        "img"+tipo.charAt(0).toUpperCase()+tipo.slice(1)
    ).src=imagenes[tipo][indice[tipo]];

}