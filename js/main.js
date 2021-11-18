
class Producto {
  constructor(nombre, unidad, precio, cantidad) {
    this.nombre = nombre.toUpperCase();
    this.precio = parseFloat(precio);
    this.cantidad = parseInt(cantidad);
    this.unidad = unidad;
  }
  sumaIva() {
    this.precio = this.precio * 1.21;
  }
}

const productos = [];
let nombre = "";
let unidad = "";
let precio = "";
let cantidad = "";
let totalizador = 0;
let i = 0;
let salida = "";
let a = 1;
let b = 1;


function valuacionTotal(precio, cantidad){
  return (precio*cantidad)
};


//js para la tabla

function leer(){
  let Prods = JSON.parse(localStorage.getItem('Prods'));
  document.getElementById('tbody').innerHTML="";
  for(let x=0; x<Prods.length;x++){
    let nombre= Prods[x].nombre;
    let cantidad=Prods[x].cantidad;
    let precio=Prods[x].precio;
    let unidad=Prods[x].unidad;
    let val= valuacionTotal(precio, cantidad);
   
    

    document.getElementById('tbody').innerHTML +=
   `
    <tr>
    <td>${nombre}</td>
    <td>$${precio}</td>
    <td>${cantidad}</td>
    <td>${unidad}</td>
    <td>$${val}</td>
   
  `
  }
}
let entrada = document.getElementById("Nombre");
entrada.onchange = () => {
  for (const producto of productos) {
    if (
      document.getElementById("Nombre").value.toUpperCase() == producto.nombre
    ) {
      alert("este producto ya lo ingresaste");
    }
  }
};

let boton = document.getElementById("agregar");
boton.onclick = () => {
  if (
    document.getElementById("Nombre").value == "" ||
    document.getElementById("Unidad").value == "" ||
    document.getElementById("Precio").value == "" ||
    document.getElementById("Cantidad").value == ""
  ) {
    alert("faltan datos");
  } else {
    $("#santi").empty();
    nombre = document.getElementById("Nombre").value;
    unidad = document.getElementById("Unidad").value;
    precio = parseInt(document.getElementById("Precio").value);
    cantidad = parseInt(document.getElementById("Cantidad").value);
    
    totalizador = totalizador + parseFloat(precio) * parseInt(cantidad);
    let productoNuevo = new Producto(nombre, unidad, precio, cantidad);
    productos.push(productoNuevo);

    let Prod={
      nombre,
      precio,
      cantidad,
      unidad
    }
    if (localStorage.getItem('Prods')===null){
      let Prods=[];
      Prods.push (Prod)
      localStorage.setItem('Prods',JSON.stringify(Prods))
    } else{
      let Prods = JSON.parse(localStorage.getItem('Prods'))
      Prods.push(Prod)
      localStorage.setItem('Prods',JSON.stringify(Prods))
    }
    localStorage.setItem(Prod, JSON.stringify(productoNuevo));
    a = a + 1;

    document.getElementById("Nombre").value = "";
    document.getElementById("Unidad").value = "";
    document.getElementById("Precio").value = "";
    document.getElementById("Cantidad").value = "";

    console.log("esto se guardó en el localstorage");
    $("#santi").append("<h3>Productos </h3>" + (a - 1) + "<h3> agregado</h3>");
  }
  
};
let boton2 = document.getElementById("totalizar");
boton2.onclick = () => {
  $("#santi").empty();
  for (const producto of productos) {
    producto.sumaIva();
  }

  for (const producto of productos) {
    console.log(producto.nombre);
    console.log(producto.cantidad + " " + producto.unidad);
    console.log("precio por unidad con iva= " + producto.precio);
    console.log("");
    let prodNom = document.createElement("div");
    $("#santi").append(`<div id="div1">
<h3> ${producto.nombre} </h3> 
<h3>${producto.cantidad + " " + producto.unidad}</h3>
<h3>${"precio por unidad con iva= $" + producto.precio}</h3>
`);
  }
  console.log("El stock está valorizado en: " + totalizador * 1.21);
  let stockValor = document.createElement("p");
  stockValor.innerHTML = "El stock recientemente cargado representa: $" + totalizador * 1.21;
  $("#santi").append(stockValor);
};

let boton3 = document.getElementById("totalizar2");
boton3.onclick = () => {
  $("#santi").empty();
  leer();
};


const URLGET = "https://jsonplaceholder.typicode.com/posts";

//Agregamos un botón con jQuery y pedimos info al proveedor con AJAX
$("#santi2").append('<button id="btn1">Consulta Servidor</button>');

$("#btn1").click(() => {
  $.get(URLGET, function (respuesta, estado) {
    if (estado === "success") {
      let misDatos = respuesta;
      for (const dato of misDatos) {
        $("body").append(`<div style="background-color: lightgray">
                                   <h3>${dato.title}</h3>
                                   <p>${dato.id}</p>
                                  </div>`);
      }
    }
  });
});

$("#btnBuscar").click(() => {
  $("#santiBusqueda").empty();
  let h = document.getElementById("barraBusqueda1").value;
  
    let Prods = JSON.parse(localStorage.getItem('Prods'));
    $("#santiBusqueda").append("Producto no encontrado");
    for(let x=0; x<Prods.length;x++){
      console.log(Prods[x].nombre);
      if (Prods[x].nombre == h) {
        $("#santiBusqueda").empty();
        $("#santiBusqueda").append("Producto disponible, por favor ir al Totalizador");
      } 
     
}});

$("#btnLimpiar").click(() => {
  $("#santiBusqueda").empty();
  document.getElementById("barraBusqueda1").value = "";
});




$("#santi2").css({
  display: "flex",
  "align-items": "right",
  "justify-content": "flex-start",
  "align-content": "right",
  "flex-direction": "column",
  "flex-wrap": "nowrap",
});

$("#santi").css({
  display: "flex",
  "align-items": "center",
  "justify-content": "flex-start",
  "align-content": "center",
  "flex-direction": "column",
  "flex-wrap": "nowrap",
});



