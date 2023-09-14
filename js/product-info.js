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

function mostrarComments(comentarios) {
  let contenedorComentarios = document.getElementById("commentList");
  for (let comment of comentarios) {
    contenedorComentarios.innerHTML += `
            <div class = "border rounded mb-2 p-2 col">
            <p><b>${comment.user}</b> - ${comment.dateTime}</p>            
            <p>${comment.description}</p>
            </div>
        `;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  traerInfo(apiProducts, mostrarInfo);
  traerInfo(apiComments, mostrarComments);
});
