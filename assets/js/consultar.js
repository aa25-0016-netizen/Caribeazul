function buscarReserva(){


let codigo =
document.getElementById("codigoReserva").value;



/*
FUTURO:

Aquí irá una petición a la base de datos:

fetch("api/reservas/"+codigo)

*/


let reservas =
JSON.parse(localStorage.getItem("reservas")) || [];



let reserva =
reservas.find(
r => r.codigo == codigo
);



if(!reserva){

alert("Reserva no encontrada");

return;

}



document.getElementById("datosReserva")
.style.display="block";



document.getElementById("codigo")
.innerHTML=reserva.codigo;


document.getElementById("nombre")
.innerHTML=reserva.nombre;


document.getElementById("habitacion")
.innerHTML=reserva.habitacion;


document.getElementById("entrada")
.innerHTML=reserva.entrada;


document.getElementById("salida")
.innerHTML=reserva.salida;


document.getElementById("total")
.innerHTML=reserva.total;


document.getElementById("estado")
.innerHTML=reserva.estado;



}



function cancelarReserva(){


alert(
"Proceso de cancelación pendiente de conexión con base de datos"
);


}



function modificarReserva(){


alert(
"Proceso de modificación pendiente de conexión con base de datos"
);


}




function pagarReserva(){


alert(
"Redirigiendo al módulo de pagos"
);


}
