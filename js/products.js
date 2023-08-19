// Guardamos en una constante el endpoint que contiene la info de los productos de categoría productos

const apiCars =
  "https://japceibal.github.io/emercado-api/cats_products/101.json";

// Guardamos en una constante el elemento con id lista-productos
// A este elemento le vamos a agregar los elementos con la información de cada producto como hijo

const contenedorLista = document.getElementById("lista-productos");

// hacemos fetch al endpoint con la información de los productos y los adjunta al elemento contenedorLista

function getProducts() {
  fetch(apiCars)
    .then((response) => response.json())
    .then((data) => showProducts(data.products));
}

// Iteramos el array que tiene la info de cada producto, por cada objeto del array creamos un elemento html y los vamos adjuntando a un elemento padre del html

function showProducts(datos) {
  for (let i = 0; i < datos.length; i++) {
    let contenedor = document.createElement("div");
    contenedor.classList.add("contenedor-producto");
    contenedor.innerHTML = `
            <div class="contenedor-imagen">
                <img class="imagen-producto" src=${datos[i].image}>
            </div>
    <div class="info-producto">
        <div>
            <h3 class="datos">${datos[i].name} - ${datos[i].currency} ${datos[i].cost}</h3>
            <p class="desc">${datos[i].description} </p> 
        </div>
        <p class="vendidos">${datos[i].soldCount} vendidos</p>
    </div>
    `;

    contenedorLista.appendChild(contenedor);
  }
}

// Una vez se carga el html, corremos el script

document.addEventListener("DOMContentLoaded", () => {
  getProducts();
});
