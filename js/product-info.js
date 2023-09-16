const apiProducts = "https://japceibal.github.io/emercado-api/products/";
const apiComments =
  "https://japceibal.github.io/emercado-api/products_comments/";
let id = localStorage.getItem("ProductID");

function traerInfo(api, funcion) {
  fetch(api + id + ".json")
    .then((Response) => Response.json())
    .then((data) => {
      funcion(data);
    });
}

function mostrarInfo(info) {
  let contenedor = document.getElementById("contenedor-producto");
  let contenedorImagenes = document.getElementById("contenedor-imagenes");

  contenedor.innerHTML = `
        <div class='mt-5'>
            <h1 class='pt-2'>${info.name}</h1>
            <hr>
        </div>
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
        <div>
            <p> <b>Imagenes ilustrativas: </b></p>
        </div>
            
        
    `;
  for (let image of info.images) {
    contenedorImagenes.innerHTML += `
        <div class='col-3 align-item-center'>
            <div class='contenedor-imagen-info'>
                <img class='imagen-info' src=${image}>
            </div>
                
        </div>
        
        `;
  }
}

let puntajeEstrellas = '';
//Función que guarda estrellas en un string según el puntaje, el cual se pasa como parámetro para reutilizar la función
function creandoEstrellas(puntajeUser){
  let allStars="";
  for (let i = 0; i < 5; i++) {
    if(i< puntajeUser){ // si i es menor que el puntaje de estrellas,le agrega una estrella llena
      allStars += '<i class="bi bi-star-fill"></i>';
    }else{allStars += '<i class="bi bi-star"></i>';} //cuando ya no se cumple la condicion del if le agrega estrellas vacías al string
  } 
  puntajeEstrellas=allStars;
}
function mostrarComments(comentarios) {
  let contenedorComentarios = document.getElementById("commentList");
  for (let comment of comentarios) {
    creandoEstrellas(comment.score);
    
    contenedorComentarios.innerHTML += `
            <div class = "border rounded mb-2 p-2 col">
            <p><b>${comment.user}</b> - ${comment.dateTime} ${puntajeEstrellas} </p>            
            <p>${comment.description}</p>
            </div>
        `;
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
  creandoEstrellas(comentario.puntos);
  contenedorComentarios.innerHTML += `
            <div class = "border rounded mb-2 p-2 col">
            <p><b>${
              comentario.usuario
            }</b> - ${comentario.fecha()} ${puntajeEstrellas}</p>            
            <p>${comentario.texto}</p>
            </div>
        `;
}

document.addEventListener("DOMContentLoaded", () => {
  const enviarComment = document.getElementById("enviar-comment");
  enviarComment.addEventListener("click", () => {
    generarComment();
  });

  traerInfo(apiProducts, mostrarInfo);
  traerInfo(apiComments, mostrarComments);
});
