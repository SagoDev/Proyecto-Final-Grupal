// Guardamos en una constante el endpoint que contiene la info de los productos de categoría productos

const api = "https://japceibal.github.io/emercado-api/cats_products/";

let catId = localStorage.getItem('catID');
let apiProducts = api + catId + '.json'
// Guardamos en una constante el elemento con id lista-productos
// A este elemento le vamos a agregar los elementos con la información de cada producto como hijo

const contenedorLista = document.getElementById("lista-productos");

// hacemos fetch al endpoint con la información de los productos y los adjunta al elemento contenedorLista

function getProducts() {
  fetch(apiProducts)
    .then((response) => response.json())
    .then((data) => showProducts(data));
}

// Iteramos el array que tiene la info de cada producto, por cada objeto del array creamos un elemento html y los vamos adjuntando a un elemento padre del html

function showProducts(datos) {
  document.getElementById('nombreCategoria').innerText = datos.catName;
  for (let i = 0; i < datos.products.length; i++) {
    let contenedor = document.createElement("div");
    contenedor.classList.add("contenedor-producto");
    contenedor.innerHTML = `
            <div class="contenedor-imagen">
                <img class="imagen-producto" src=${datos.products[i].image}>
            </div>
    <div class="info-producto">
        <div>
            <h3 class="datos">${datos.products[i].name} - ${datos.products[i].currency} ${datos.products[i].cost}</h3>
            <p class="desc">${datos.products[i].description} </p> 
        </div>
        <p class="vendidos">${datos.products[i].soldCount} vendidos</p>
    </div>
    `;

    contenedorLista.appendChild(contenedor);
  }
}

let buscador=document.getElementById("buscar");
 buscador.addEventListener("keyup",(e)=>{
    document.querySelectorAll(".contenedor-producto").forEach(el=>{
      el.textContent.toLowerCase().includes(e.target.value.toLowerCase())
      ?el.classList.remove("filtrar")
      :el.classList.add("filtrar")
    })
 })

// Una vez se carga el html, corremos el script

document.addEventListener("DOMContentLoaded", () => {
  getProducts();
});
