// Guardamos en una constante el endpoint que contiene la info de los productos de categoría productos

const api = "https://japceibal.github.io/emercado-api/cats_products/";

let catId = localStorage.getItem("catID");
let apiProducts = api + catId + ".json";
let minCount = document.getElementById("rangeFilterCountMin");
let maxCount = document.getElementById("rangeFilterCountMax");

// Se declara una variable que contendrá el array de productos
let products = [];

// Esta variable contendrá el nombre de la categoría de productos
let catName = "";

// Guardamos en una constante el elemento con id lista-productos
// A este elemento le vamos a agregar los elementos con la información de cada producto como hijo

const contenedorLista = document.getElementById("lista-productos");

// hacemos fetch al endpoint con la información de los productos y los adjunta al elemento contenedorLista

function getProductsAndPlaceIntoArr(api) {
  fetch(api)
    .then((response) => response.json())
    .then((data) => {
      products = data.products;
      catName = data.catName;
    })
    .then(() => displayProducts(products));
}

// Ordena los productos de forma ascendente o descendente
function sortProducts(arr, bool, property) {
  let currentProducts = arr;
  contenedorLista.innerHTML = "";
  if (bool) {
    currentProducts.sort((a, b) => a[property] - b[property]);
    displayProducts(currentProducts);
  } else {
    currentProducts.sort((a, b) => b[property] - a[property]);
    displayProducts(currentProducts);
  }
}

// Recibe un array con productos y los muestra en pantalla
// Iteramos el array que tiene la info de cada producto, por cada objeto del array creamos un elemento html y los vamos adjuntando a un elemento padre del html

function displayProducts(arr) {
  let divContent = "";
  for (let i = 0; i < arr.length; i++) {
    // Desestructuración del objeto actual para que sea más fácil acceder a cada una de sus propiedades.
    // Sería como guardar las propiedades del objeto en variables
    let { image, name, currency, cost, description, soldCount } = arr[i];
    divContent += `
    <div class="contenedor-producto">
    <div class="contenedor-imagen">
                <img class="imagen-producto" src=${image}>
            </div>
    <div class="info-producto">
        <div>
            <h3 class="datos">${name} - ${currency} ${cost}</h3>
            <p class="desc">${description} </p> 
        </div>
        <p class="vendidos">${soldCount} vendidos</p>
    </div>
    </div>
    `;
  }
  contenedorLista.innerHTML = divContent;
  document.getElementById("nombreCategoria").innerText = catName;
}

function showProductsInPriceRange() {
  if (minCount.value && maxCount.value) {
    let currentProducts = products.filter(
      (e) =>
        e.cost >= parseInt(minCount.value) && e.cost <= parseInt(maxCount.value)
    );
    displayProducts(currentProducts);
    return currentProducts;
  }
  return products;
}

function changeButtonImage(bool, element, className) {
  if (bool) {
    element.classList.remove(`${className}-down`);
    element.classList.add(`${className}-up`);
  } else {
    element.classList.remove(`${className}-up`);
    element.classList.add(`${className}-down`);
  }
}

// Cuando carga el DOM se corre se declaran constantes y variables
// Se muestran los productos en pantalla
// Se agregan eventlisteners a los botones y al buscador

document.addEventListener("DOMContentLoaded", () => {
  const sortCost = document.getElementById("precio");
  const sortRelevancia = document.getElementById("relevancia");
  const priceSortBtn = document.getElementById("sortPrecio");
  const relSortBtn = document.getElementById("sortRelevancia");
  const filterBtn = document.getElementById("rangeFilterCount");
  const clearFilterBtn = document.getElementById("clearRangeFilter");
  const priceBtnIcon = "fa-sort-numeric";
  const relBtnIcon = "fa-sort-amount";
  const searchBar = document.getElementById("buscar");

  let priceBool = false;
  let relBool = false;

  getProductsAndPlaceIntoArr(apiProducts);

  searchBar.addEventListener("keyup", () => {
    let arrayProducts = Array.from(
      document.getElementsByClassName("contenedor-producto")
    );
    arrayProducts.forEach((el) => {
      !el.textContent.toLowerCase().includes(searchBar.value.toLowerCase())
        ? el.classList.add("buscando")
        : el.classList.remove("buscando");
    });
  });

  sortCost.addEventListener("click", () => {
    priceBool = !priceBool;
    changeButtonImage(priceBool, priceSortBtn, priceBtnIcon);
    sortProducts(showProductsInPriceRange(), priceBool, "cost");
  });

  sortRelevancia.addEventListener("click", () => {
    relBool = !relBool;
    changeButtonImage(relBool, relSortBtn, relBtnIcon);
    sortProducts(showProductsInPriceRange(), relBool, "soldCount");
  });

  filterBtn.addEventListener("click", () => {
    showProductsInPriceRange();
  });

  clearFilterBtn.addEventListener("click", () => {
    minCount.value = "";
    maxCount.value = "";
    displayProducts(products);
  });
});
