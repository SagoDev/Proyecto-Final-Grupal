const apiProductos = "https://japceibal.github.io/emercado-api/products/";
const apiComentarios = "https://japceibal.github.io/emercado-api/products_comments/";

let id = localStorage.getItem("ProductID");


//  Trae información de la API
function traerInfo(api, funcion) {
  fetch(api + id + ".json")
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      funcion(datos);
      console.log(api + id + ".json");
    });
}


//  Muestra la información del producto en la página
//  Da funcionalidad al botón de comprar
function mostrarInfo(info) {
  let contenedor = document.getElementById("contenedor_producto");
  let contenedorCarrusel = document.getElementById("carousel-inner");
  let titulo = document.getElementById("contenedor_titulo");

  //  Texto del producto
  titulo.innerHTML = `
  <h1 class='pt-2'>${info.name}</h1>
  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
  <a href=""><button class="btn btn-primary" type="button" id="comprar">Comprar</button></a>
  </div>
  <hr>
  `;

  contenedor.innerHTML = `
        <div>
            <p> <b>Precio:</b> <br> ${info.currency} ${info.cost}</p>
        </div>
        <div>
            <p> <b>Descripcion: </b> <br> ${info.description}</p>
        </div>
        <div>
            <p> <b> Categoria: </b> <br> ${info.category}</p>
        </div>
        <div>
            <p> <b> Cantidad de vendidos: </b> <br> ${info.soldCount}</p>
        </div>
      `;

  //  Fotos del producto    
  contenedorCarrusel.innerHTML += `
    <div class="carousel-item active">
      <img src="${info.images[0]}" class="d-block w-100">
    </div>       
  `;

  for (let i = 1; i < info.images.length; i++) {
    contenedorCarrusel.innerHTML += `
        <div class="carousel-item">
          <img src="${info.images[i]}" class="d-block w-100">
        </div>       
        `;
  }
  //  Funcionalidad del botón de compra
  let comprarBtn = document.getElementById("comprar");
  let productosDelCarrito = [];

  //  Si recibe un producto al local storage lo convierte en JSON
  if (localStorage.getItem("productos")) {
    productosDelCarrito = JSON.parse(localStorage.getItem("productos"));
  }
  //  Cuando escucha el click en el botón
  //    Crea un objeto del producto y lo guarda en el local storage como string
  //    interactua con la línea 68
  comprarBtn.addEventListener("click", function () {
    let tituloProducto = info.name;
    let monedaProducto = info.currency;
    let precioUn = info.cost;
    let imagen = info.images[0];
    let cantidad = 1;

    let producto = {
      titulo: tituloProducto,
      imagenSrc: imagen,
      moneda: monedaProducto,
      precioUnidad: precioUn,
      cantidad: cantidad
    };

    productosDelCarrito.push(producto);
    localStorage.setItem("productos", JSON.stringify(productosDelCarrito));
  });
}


//  Comentarios

//  Guarda las estrellas fuera de la función creandoEstrellas
let puntajeEstrellas = "";

//  Crea las estrellas de puntuación
function creandoEstrellas(puntajeUsuario) {
  let estrellas = "";
  for (let i = 0; i < 5; i++) {
    if (i < puntajeUsuario) {
      estrellas += '<i class="bi bi-star-fill estrellita"></i>'; //  Estrellas pintadas
    } else {
      estrellas += '<i class="bi bi-star estrellita"></i>'; //  Estrellas vacías
    }
  }
  puntajeEstrellas = estrellas;
}


//   Genera un numero aleatorio para usar en código RGB
function generarColorAleatorio() {
  var componente = Math.floor(Math.random() * 256).toString(16);
  // Asegurarse de que el componente tenga siempre dos dígitos
  return ("0" + componente).slice(-2);
}

//  Genera el código de color RGB completo
function generarColorCSSAleatorio() {
  var rojo = generarColorAleatorio();
  var verde = generarColorAleatorio();
  var azul = generarColorAleatorio();
  var colorRGB = rojo + verde + azul;
  return colorRGB;
}

//  Muestra los comentarios en la página
function mostrarComentarios(comentarios) {
  let contenedorComentarios = document.getElementById("commentList");
  for (let comment of comentarios) {
    creandoEstrellas(comment.score);

    let colorRandom = generarColorCSSAleatorio();
    let avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.user}&backgroundColor=${colorRandom}`;

    contenedorComentarios.innerHTML +=
      `<div class = "border rounded mb-2 p-2">
              <div class="avatar"><img class="rounded-circle" src=${avatar}></div>
              <div class="texto">
                <div class="row row-cols-auto">
                  <div class="col p-0"><b>${comment.user}</b></div> <div class="col p-0 px-md-2">${comment.dateTime}</div> <div class="col p-0 px-md-3">${puntajeEstrellas}</div>
                </div> 
                <div class="ml-5">           
                  <p>${comment.description}</p>
                </div>  
              </div>
            </div>`;
  }
}

//  Reconoce la cantidad de estrellas seleccionadas cuando se hace un comentario nuevo
function traerValorEstrellas() {
  let estrellas = document.getElementsByName("estrellas");
  for (let i = 0; i < estrellas.length; i++) {
    if (estrellas[i].checked) {
      console.log(estrellas[i].value);
      return estrellas[i].value;
    }
  }
}

//  Crea un comentario nuevo
function generarComentario() {
  let contenedorComentarios = document.getElementById("commentList");
  let usuario = JSON.parse(localStorage.getItem("user")).email;
  let descripcion = document.getElementById("textarea");
  let puntuacion = traerValorEstrellas();
  let comentario = {
    texto: descripcion.value,
    puntos: puntuacion,
    usuario: usuario,
    fecha: () => {
      date = new Date().toJSON();
      return date.replace("T", " ").slice(0, 19);
    },
  };
  let colorRandom = generarColorCSSAleatorio();
  let avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${comentario.usuario}&backgroundColor=${colorRandom}`;
  creandoEstrellas(comentario.puntos);
  contenedorComentarios.innerHTML +=
    `<div class = "border rounded mb-2 p-2">
              <div class="avatar"><img class="rounded-circle" src=${avatar}></div>
              <div class="texto">
                <div class="row row-cols-auto">
                  <div class="col p-0"><b>${comentario.usuario}</b></div> <div class="col p-0 px-md-2">${comentario.fecha()}</div> <div class="col p-0 px-md-3">${puntajeEstrellas}</div>
                </div> 
                <div class="ml-5">           
                  <p>${comentario.texto}</p>
                </div>  
              </div>
            </div>`
    ;
}

// Muestra los productos relacionados en la página
function mostrarRelacionados(info) {
  let contenedor = document.getElementById("contenedor-relacionados");
  for (let i of info.relatedProducts) {
    contenedor.innerHTML += `
    <div onclick="setearIdProducto(${i.id})" class="col-4 productos-relacionados">
        <div class="tarjetas-relacionadas card" style="width: auto;">
          <img src="${i.image}" class="card-img-top" alt="...">
          <div class="card-body">
          <h5 class="d-flex justify-content-center">${i.name}</h5>
          </div>
        </div>
    </div>`;
  }
}

// Redirige a la página de un producto relacionado
function setearIdProducto(id) {
  localStorage.setItem("ProductID", id);
  window.location = "product-info.html";
}


//  Amplía una imagen 
function zoomImagen() {
  let contenedorImgActiva = Array.from(document.getElementsByClassName("active"));
  let img = contenedorImgActiva[0].childNodes[1].src;  

  let divTransparente = document.createElement("div");
  divTransparente.style =
    "background-color: rgba(0, 0, 0, 0.7); width: 100vw; height: 100vh; z-index: 5000; position: fixed; top: 0px; left: 0; display: flex; justify-content: center; align-items: center;";

  let contenedorImg = document.createElement("div");
  contenedorImg.style =
    "background-color: aliceblue; box-shadow:  0px 0px 50px rgba(0, 0, 0, 0.74); border-radius: 10px;";

  contenedorImg.innerHTML = `<img src="${img}" style="height: auto;">`;

  document.body.appendChild(divTransparente);
  divTransparente.appendChild(contenedorImg);

  divTransparente.addEventListener("click", () => {
    divTransparente.removeChild(contenedorImg);
    document.body.removeChild(divTransparente);
  });
}

//  Cuando se carga la página
//    Escucha un click para generar un comentario
//    Muestra: *el producto *sus fotos *sus comentarios *sus productos relacionados
//    Escucha un click para hacer zoom a la imágen
document.addEventListener("DOMContentLoaded", () => {
  const btnEnviarComentario = document.getElementById("enviar-comment");
  btnEnviarComentario.addEventListener("click", () => {
  let descripcion = document.getElementById("textarea");
    if (descripcion.value) {
      generarComentario();
    }
  });
  traerInfo(apiProductos, mostrarInfo);
  traerInfo(apiComentarios, mostrarComentarios);
  traerInfo(apiProductos, mostrarRelacionados);

  let imgCarousel = document.getElementById("carousel-inner");
  imgCarousel.addEventListener("click", zoomImagen);
});