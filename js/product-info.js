const apiProducts = "https://japceibal.github.io/emercado-api/products/";
const apiComments =
  "https://japceibal.github.io/emercado-api/products_comments/";

let id = localStorage.getItem("ProductID");

function traerInfo(api, funcion) {
  fetch(api + id + ".json")
    .then((Response) => Response.json())
    .then((data) => {
      funcion(data);
      console.log(api + id + ".json");
    });
}

function mostrarInfo(info) {
  let contenedor = document.getElementById("contenedor-producto");
  let contenedorCarrusel = document.getElementById("carousel-inner");
  let titulo = document.getElementById("contenedorTitulo");

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
  // Variable para acceder al botón y otra para el array de productos del carrito
  let comprarBtn = document.getElementById("comprar");
  let productosDelCarrito = [];

if (localStorage.getItem("productos")) {
  productosDelCarrito = JSON.parse(localStorage.getItem("productos"));
}
//Función que al hacer click en comprar guardamos la info del producto en un objeto y lo enviamos al array y luego al local storage
comprarBtn.addEventListener("click", function() {
  let tituloProduct = info.name;
  let monedaProducto= info.currency ;
  let precioUn=info.cost;
  let imagenSrc = info.images[0];
  let cantidad=1;
  // Creamos un objeto con la información que quiero usar del producto
  let producto = {
    titulo: tituloProduct,
    imagenSrc: imagenSrc,
    moneda: monedaProducto,
    precioUnidad:precioUn,
    cantidad:cantidad
  };
  // Añadimos el nuevo producto al array
  productosDelCarrito.push(producto);
  // Guardamos el array de productos en el localStorage 
  localStorage.setItem("productos", JSON.stringify(productosDelCarrito));
});
}

let puntajeEstrellas = "";
//Función que guarda estrellas en un string según el puntaje, el cual se pasa como parámetro para reutilizar la función
function creandoEstrellas(puntajeUser) {
  let allStars = "";
  for (let i = 0; i < 5; i++) {
    if (i < puntajeUser) {
      // si i es menor que el puntaje de estrellas,le agrega una estrella llena
      allStars += '<i class="bi bi-star-fill estrellita"></i>';
    } else {
      allStars += '<i class="bi bi-star estrellita"></i>';
    } //cuando ya no se cumple la condicion del if le agrega estrellas vacías al string
  }
  puntajeEstrellas = allStars;
}
function generarColorAleatorio() {
  var componente = Math.floor(Math.random() * 256).toString(16);
  // Asegurarse de que el componente tenga siempre dos dígitos
  return ("0" + componente).slice(-2);
}

function generarColorCSSAleatorio() {
  // Generar tres componentes de color aleatorios para RGB
  var rojo = generarColorAleatorio();
  var verde = generarColorAleatorio();
  var azul = generarColorAleatorio();
  var colorRGB = rojo + verde + azul;
  return colorRGB;
}
function mostrarComments(comentarios) {
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

function traerValorEstrellas() {
  let estrellas = document.getElementsByName("estrellas");
  for (let i = 0; i < estrellas.length; i++) {
    if (estrellas[i].checked) {
      console.log(estrellas[i].value);
      return estrellas[i].value;
    }
  }
}

function generarComment() {
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

function mostrarRelacionados(info) {
  let contenedor = document.getElementById("contenedor-relacionados");
  for (let i of info.relatedProducts) {
    contenedor.innerHTML += `
    <div onclick="setProductID(${i.id})" class="col-4">
        <div class="tarjetas-relacionadas card" style="width: auto;">
          <img src="${i.image}" class="card-img-top" alt="...">
          <div class="card-body">
          <h5 class="d-flex justify-content-center">${i.name}</h5>
          </div>
        </div>
    </div>`;
  }
}

function setProductID(id) {
  localStorage.setItem("ProductID", id);
  window.location = "product-info.html";
}

function imageZoom() {
  let contImgActive = Array.from(document.getElementsByClassName("active"));
  let img = contImgActive[0].childNodes[1].src;
  console.log(contImgActive);
  console.log(img);
  let body = document.getElementsByTagName("body")[0];

  let divTransparente = document.createElement("div");
  divTransparente.style =
    "background-color: rgba(0, 0, 0, 0.7); width: 100vw; height: 100vh; z-index: 5000; position: fixed; top: 0px; left: 0; display: flex; justify-content: center; align-items: center;";

  let contImg = document.createElement("div");
  contImg.style =
    "background-color: aliceblue; box-shadow:  0px 0px 50px rgba(0, 0, 0, 0.74); border-radius: 10px;";

  contImg.innerHTML = `<img src="${img}" style="height: auto;">`;

  body.appendChild(divTransparente);
  divTransparente.appendChild(contImg);

  divTransparente.addEventListener("click", () => {
    divTransparente.removeChild(contImg);
    body.removeChild(divTransparente);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const enviarComment = document.getElementById("enviar-comment");
  enviarComment.addEventListener("click", () => {
    let descripcion = document.getElementById("textarea");
    if (descripcion.value) {
      generarComment();
    }
  });
  traerInfo(apiProducts, mostrarInfo);
  traerInfo(apiComments, mostrarComments);
  traerInfo(apiProducts, mostrarRelacionados);

  let imgCarousel = document.getElementById("carousel-inner");
  imgCarousel.addEventListener("click", imageZoom);
});