// Guardamos en una constante el endpoint que contiene la info de los productos de categoría productos

const api = "https://japceibal.github.io/emercado-api/cats_products/";

let catId = localStorage.getItem("catID");
let apiProducts = api + catId + ".json";
let currentProducts = [];
let minCount = document.getElementById("rangeFilterCountMin");
let maxCount = document.getElementById("rangeFilterCountMax");

// Guardamos en una constante el elemento con id lista-productos
// A este elemento le vamos a agregar los elementos con la información de cada producto como hijo

const contenedorLista = document.getElementById("lista-productos");

// hacemos fetch al endpoint con la información de los productos y los adjunta al elemento contenedorLista

function getProducts() {
  fetch(apiProducts)
    .then((response) => response.json())
    .then((data) => {
      showProducts(data);
    });
}

// Variable para definir si esta activo el boton de filtro por precio
let booleanPrecio = false;
let booleanRelevancia = false;

function filtrarPrecio() {
  while (contenedorLista.firstChild) {
    contenedorLista.removeChild(contenedorLista.firstChild);
  }
  if (booleanPrecio) {
    fetch(apiProducts)
      .then((response) => response.json())
      .then((data) => {
        data.products.sort((a, b) => b.cost - a.cost);
        showProducts(data);
      });
  } else {
    fetch(apiProducts)
      .then((response) => response.json())
      .then((data) => {
        data.products.sort((a, b) => a.cost - b.cost);
        showProducts(data);
      });
  }
}

function filtrarRelevancia() {
  while (contenedorLista.firstChild) {
    contenedorLista.removeChild(contenedorLista.firstChild);
  }
  if (booleanRelevancia) {
    fetch(apiProducts)
      .then((response) => response.json())
      .then((data) => {
        data.products.sort((a, b) => b.soldCount - a.soldCount);
        showProducts(data);
      });
  } else {
    fetch(apiProducts)
      .then((response) => response.json())
      .then((data) => {
        data.products.sort((a, b) => a.soldCount - b.soldCount);
        showProducts(data);
      });
  }
}

// Iteramos el array que tiene la info de cada producto, por cada objeto del array creamos un elemento html y los vamos adjuntando a un elemento padre del html

function showProducts(datos) {
  document.getElementById("nombreCategoria").innerText = datos.catName;
  for (let i = 0; i < datos.products.length; i++) {
    {
      let contenedor = document.createElement("div");
      contenedor.id = "soyContenedor";
      contenedor.classList.add("contenedor-producto");
      contenedor.innerHTML = `
            <div class="contenedor-imagen">
                <img class="imagen-producto" src=${datos.products[i].image}>
            </div>
    <div class="info-producto">
        <div>
            <h3 class="datos">${datos.products[i].name} - ${datos.products[i].currency} <span class="price"> ${datos.products[i].cost} </span></h3>
            <p class="desc">${datos.products[i].description} </p> 
        </div>
        <p class="vendidos">${datos.products[i].soldCount} vendidos</p>
    </div>
    `;
      contenedorLista.appendChild(contenedor);
    }
  }
}

function showProductsByPriceRange() {
  fetch(apiProducts)
    .then((response) => response.json())
    .then((data) => {
      function showProductsInRange(datos) {
        contenedorLista.innerHTML = "";
        document.getElementById("nombreCategoria").innerText = datos.catName;

        if (minCount.value && maxCount.value) {
          for (let i = 0; i < datos.products.length; i++) {
            if (
              data.products[i].cost >= minCount.value &&
              data.products[i].cost <= maxCount.value
            ) {
              {
                let contenedor = document.createElement("div");
                contenedor.id = "soyContenedor";
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
          }
        } else {
          showProducts(data);
        }
      }
      showProductsInRange(data);
    });
}
// Inicio Buscador.

let buscador = document.getElementById("buscar");
buscador.addEventListener("keyup", (e) => {
  let arrayProducts = Array.from(
    document.getElementsByClassName("contenedor-producto")
  );
  arrayProducts.forEach((el) => {
    !el.textContent.toLowerCase().includes(buscador.value.toLowerCase())
      ? el.classList.add("buscando")
      : el.classList.remove("buscando");
  });
});
// Fin Buscador

// Una vez se carga el html, corremos el script

document.addEventListener("DOMContentLoaded", () => {
  let sortCost = document.getElementById("precio");
  let sortRelevancia = document.getElementById("relevancia");

  getProducts();
  sortCost.addEventListener("click", () => {
    booleanPrecio = !booleanPrecio;
    if (booleanPrecio) {
      document
        .getElementById("sortPrecio")
        .classList.remove("fa-sort-numeric-down");
      document.getElementById("sortPrecio").classList.add("fa-sort-numeric-up");
    } else {
      document
        .getElementById("sortPrecio")
        .classList.remove("fa-sort-numeric-up");
      document
        .getElementById("sortPrecio")
        .classList.add("fa-sort-numeric-down");
    }
    filtrarPrecio();
  });

  sortRelevancia.addEventListener("click", () => {
    booleanRelevancia = !booleanRelevancia;
    if (booleanRelevancia) {
      document
        .getElementById("sortRelevancia")
        .classList.remove("fa-sort-amount-down");
      document
        .getElementById("sortRelevancia")
        .classList.add("fa-sort-amount-up");
    } else {
      document
        .getElementById("sortRelevancia")
        .classList.remove("fa-sort-amount-up");
      document
        .getElementById("sortRelevancia")
        .classList.add("fa-sort-amount-down");
    }
    filtrarRelevancia();
  });

  document.getElementById("rangeFilterCount").addEventListener("click", () => {
    showProductsByPriceRange();
  });

  document.getElementById("clearRangeFilter").addEventListener("click", () => {
    minCount.value = "";
    maxCount.value = "";
    showProductsByPriceRange();
  });
});
