// ==========================================
// HOTEL CARIBE AZUL
// reservacion.js
// ==========================================

// ================================
// PRECIOS POR NOCHE
// ================================

const precios = {
    "Sencilla": 5000,
    "Doble": 8500,
    "Suite": 11000
};


// ================================
// CAMBIAR DOCUMENTO
// ================================

function cambiarDocumento() {

    const nacionalidad = document.getElementById("nacionalidad");
    const documento = document.getElementById("documento");
    const etiqueta = document.getElementById("lblDocumento");

    documento.value = "";

    if (nacionalidad.value === "dominicano") {

        documento.disabled = false;

        etiqueta.innerHTML = "Cédula";

        documento.placeholder = "000-0000000-0";

        documento.maxLength = 13;

        documento.removeAttribute("pattern");

        documento.oninput = function () {

            let valor = this.value.replace(/\D/g, "");

            if (valor.length > 11)
                valor = valor.substring(0,11);

            if (valor.length > 3)
                valor = valor.substring(0,3) + "-" + valor.substring(3);

            if (valor.length > 11)
                valor = valor.substring(0,11) + "-" + valor.substring(11);

            this.value = valor;

        };

    }

    else if (nacionalidad.value === "extranjero") {

        documento.disabled = false;

        etiqueta.innerHTML = "Pasaporte";

        documento.placeholder = "Ej. AB123456";

        documento.maxLength = 15;

        documento.pattern = "[A-Za-z0-9]{6,15}";

        documento.oninput = null;

    }

    else {

        documento.disabled = true;

        etiqueta.innerHTML = "Documento de Identidad";

        documento.placeholder = "Seleccione primero la nacionalidad";

        documento.oninput = null;

    }

}


// ================================
// FORMATO TELÉFONO
// ================================

function formatoTelefono(){

    let telefono = document.getElementById("telefono");

    let valor = telefono.value.replace(/\D/g,"");

    if(valor.length>10)
        valor = valor.substring(0,10);

    if(valor.length>3)
        valor = valor.substring(0,3)+"-"+valor.substring(3);

    if(valor.length>7)
        valor = valor.substring(0,7)+"-"+valor.substring(7);

    telefono.value = valor;

}


// ================================
// CONVERTIR FECHA
// (Flatpickr devuelve dd/mm/yyyy)
// ================================

function convertirFecha(fecha){

    const partes = fecha.split("/");

    return new Date(

        partes[2],
        partes[1]-1,
        partes[0]

    );

}


// ================================
// CALCULAR TOTAL
// ================================

function calcularTotal(){

    const habitacion = document.getElementById("habitacion").value;

    const entrada = document.getElementById("entrada").value;

    const salida = document.getElementById("salida").value;

    if(habitacion==="" || entrada==="" || salida===""){

        document.getElementById("precioNoche").textContent="RD$0.00";
        document.getElementById("cantidadNoches").textContent="0";
        document.getElementById("totalReserva").textContent="RD$0.00";

        return;

    }

    const fechaEntrada = convertirFecha(entrada);

    const fechaSalida = convertirFecha(salida);

    const diferencia = fechaSalida.getTime()-fechaEntrada.getTime();

    const noches = Math.ceil(diferencia/(1000*60*60*24));

    if(noches<=0){

        alert("La fecha de salida debe ser posterior a la fecha de entrada.");

        document.getElementById("cantidadNoches").textContent="0";
        document.getElementById("totalReserva").textContent="RD$0.00";

        return;

    }

    const precio = precios[habitacion];

    document.getElementById("precioNoche").textContent =
        "RD$ " + precio.toLocaleString();

    document.getElementById("cantidadNoches").textContent =
        noches;

    document.getElementById("totalReserva").textContent =
        "RD$ " + (precio*noches).toLocaleString();

}


// ================================
// VALIDAR CAPACIDAD
// ================================

function validarCapacidad(){

    const habitacion = document.getElementById("habitacion").value;

    const personas = parseInt(document.getElementById("personas").value);

    if(!habitacion || isNaN(personas))
        return;

    let maximo=0;

    switch(habitacion){

        case "Sencilla":
            maximo=2;
            break;

        case "Doble":
            maximo=4;
            break;

        case "Suite":
            maximo=5;
            break;

    }

    if(personas>maximo){

        alert("La habitación "+habitacion+
        " admite un máximo de "+maximo+" huéspedes.");

        document.getElementById("personas").value="";

    }

}


// ================================
// GENERAR CÓDIGO
// ================================

function generarCodigo(numero=null){

    if(numero===null){

        numero=Math.floor(Math.random()*999999)+1;

    }

    return "RES-"+String(numero).padStart(6,"0");

}
// ================================
// CONFIRMAR RESERVA
// ================================

function confirmarReserva(event){

    event.preventDefault();

    if(!confirm("¿Desea confirmar la reservación?"))
        return false;

    const codigo = generarCodigo();


// ==========================================
// GUARDAR RESERVA TEMPORALMENTE
// ==========================================

let reservas = JSON.parse(localStorage.getItem("reservas")) || [];


let nuevaReserva = {

    codigo: codigo,

    nombre:
    document.getElementById("nombre").value,

    documento:
    document.getElementById("documento").value,

    telefono:
    document.getElementById("telefono").value,

    correo:
    document.getElementById("correo").value,

    habitacion:
    document.getElementById("habitacion").value,

    personas:
    document.getElementById("personas").value,

    entrada:
    document.getElementById("entrada").value,

    salida:
    document.getElementById("salida").value,

    noches:
    document.getElementById("cantidadNoches").textContent,

    precio:
    document.getElementById("precioNoche").textContent,

    total:
    document.getElementById("totalReserva").textContent,

    metodoPago:
    document.getElementById("metodoPago").value,

    estado:
    "En espera de pago",

    fecha:
    new Date().toLocaleString("es-DO")

};


reservas.push(nuevaReserva);


localStorage.setItem(
    "reservas",
    JSON.stringify(reservas)
);


// Mostrar comprobante

document.getElementById("cCodigo").textContent = codigo;


document.getElementById("cNombre").textContent =
    document.getElementById("nombre").value;

    document.getElementById("cCodigo").textContent = codigo;

    document.getElementById("cNombre").textContent =
        document.getElementById("nombre").value;

    document.getElementById("cDocumento").textContent =
        document.getElementById("documento").value;

    document.getElementById("cHabitacion").textContent =
        document.getElementById("habitacion").value;

    document.getElementById("cEntrada").textContent =
        document.getElementById("entrada").value;

    document.getElementById("cSalida").textContent =
        document.getElementById("salida").value;

    document.getElementById("cNoches").textContent =
        document.getElementById("cantidadNoches").textContent;

    document.getElementById("cPrecio").textContent =
        document.getElementById("precioNoche").textContent;

    document.getElementById("cTotal").textContent =
        document.getElementById("totalReserva").textContent;

    document.getElementById("cMetodo").textContent =
        document.getElementById("metodoPago").value;

    document.getElementById("cEstado").textContent =
        "En espera de pago";

    document.getElementById("cEstado").style.color = "#d97706";

    const hoy = new Date();

    document.getElementById("cFecha").textContent =
        hoy.toLocaleDateString("es-DO") + " - " +
        hoy.toLocaleTimeString("es-DO");

    document.getElementById("comprobante").style.display = "block";

    document.getElementById("comprobante").scrollIntoView({
        behavior: "smooth"
    });

    return false;

}


// ================================
// IMPRIMIR COMPROBANTE
// ================================

function imprimirComprobante(){

    const contenido =
        document.getElementById("comprobante").innerHTML;

    const ventana =
        window.open("", "_blank", "width=900,height=800");

    ventana.document.write(`

        <html>

        <head>

            <title>Comprobante de Reservación</title>

            <style>

                body{

                    font-family:Arial,sans-serif;
                    margin:40px;

                }

                h1,h2,h3{

                    text-align:center;

                }

                table{

                    width:100%;
                    border-collapse:collapse;

                }

                td{

                    padding:8px;

                }

                hr{

                    margin:20px 0;

                }

                .titulo{

                    color:#0066cc;

                }

            </style>

        </head>

        <body>

            <h1 class="titulo">
                HOTEL CARIBE AZUL
            </h1>

            <hr>

            ${contenido}

            <hr>

            <p style="text-align:center;">

                Gracias por elegir
                <strong>Hotel Caribe Azul</strong>

            </p>

        </body>

        </html>

    `);

    ventana.document.close();

    ventana.focus();

    ventana.print();

}


// ================================
// FECHA MÍNIMA
// ================================

window.onload = function(){

    let hoy = new Date();

    hoy.setMinutes(
        hoy.getMinutes() - hoy.getTimezoneOffset()
    );

    let fecha =
        hoy.toISOString().split("T")[0];

    if(document.getElementById("entrada"))
        document.getElementById("entrada").min = fecha;

}