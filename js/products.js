// Constante con el endpoint incompleto
// Variable para que pueda usar cualquier id de categoría
// Constante y variable con la terminación para que quede la URL completa
const api = "https://japceibal.github.io/emercado-api/cats_products/";
let catId = localStorage.getItem("catID");
let apiProducts = api + catId + ".json";

// Variable que contendrá el array de productos
let products = [];

// Constantes con los inputs de precio mínimo y máximo
const minCount = document.getElementById("rangeFilterCountMin");
const maxCount = document.getElementById("rangeFilterCountMax");

// Variable que contendrá el nombre de la categoría de productos
let catName = "";

// Constante con la ubicación de donde irá la lista de productos
const contenedorLista = document.getElementById("lista-productos");

// Función que hace fetch a la api
//   Almacena los productos y el nombre de la categoría
//   Llama a la función que muestra los productos
function getProductsData(api) {
  fetch(api)
    .then((response) => response.json())
    .then((data) => {
      products = data.products;
      catName = data.catName;
    })
    .then(() => displayProducts(products));
}

// Función que ordena los productos de forma ascendente o descendente
//   Crea un nuevo array de productos
//   Vacía el contenedor de la lista
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

// Función que muestra los productos en pantalla
//   Muestra el nombre de la categoría en pantalla
function displayProducts(arr) {
  let divContent = "";
  for (let i = 0; i < arr.length; i++) {
    let { soldCount, name, currency, cost, description, image, id} = arr[i];
    divContent += `
    <div onclick="setProductID(${id})" class="contenedor-producto pe-auto bg-light text-dark row"> 
        <div class="imagen-producto mb-3 col-sm-12 col-md-4 col-lg-4">
            <img class="img-fluid" src=${image}>
        </div>
        <div class="row col-sm-12 col-md-8 col-lg-8 text-center text-md-start text-lg-start text-xg-start">            
            <div class="col-md-12 col-lg-10">
                <div class="mb-3">
                    <h3 class="">${name}</h3>
                </div>
                <div class="mb-3">
                    <h3 class="">${currency} ${cost}</h3>
                </div>            
                <div class="">
                    <p class="">${description} </p> 
                </div>
            </div>
            <div class="col-md-12 col-lg-2 text-center text-md-start text-lg-end text-xg-end">
                <p class="datos">${soldCount} vendidos</p>
            </div>
        </div>
    </div>
    `;
  }
  contenedorLista.innerHTML = divContent;
  document.getElementById("nombreCategoria").innerText = catName;
}

// Función que muestra los productos usando el filtro de precio
function showProductsInPriceRange() {
  let minValue = minCount.value || 0;
  let maxValue = maxCount.value || Math.max(...products.map((e) => e.cost));
  let currentProducts = products.filter(
    (e) => e.cost >= minValue && e.cost <= maxValue
  );
  displayProducts(currentProducts);
  return currentProducts;
}

// Función que cambia la clase Bootstrap para cambiar la imagen de los botones de ordenar productos 
function changeButtonImage(bool, element, className) {
  if (bool) {
    element.classList.remove(`${className}-down`);
    element.classList.add(`${className}-up`);
  } else {
    element.classList.remove(`${className}-up`);
    element.classList.add(`${className}-down`);
  }
}

// Función que agarra el ID de un producto
//   Lo guarda en Local storage
//   Redirige a la página del producto seleccionado
function setProductID(id) {
  localStorage.setItem("ProductID", id);
  window.location = "product-info.html";
}

// Cuando se carga la página
//   Ejecuta función que hace fetch a la API
//   Escucha todos los filtros
document.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.getElementById("buscar");
  const sortCost = document.getElementById("precio");
  const sortRelevancia = document.getElementById("relevancia");
  const priceSortBtn = document.getElementById("sortPrecio");
  const relSortBtn = document.getElementById("sortRelevancia");
  const filterBtn = document.getElementById("rangeFilterCount");
  const clearFilterBtn = document.getElementById("clearRangeFilter");

  const priceBtnIcon = "fa-sort-numeric";
  const relBtnIcon = "fa-sort-amount";

  let priceBool = false;
  let relBool = false;

  getProductsData(apiProducts);

  // Escucha a la barra de busqueda y filtra los productos en tiempo real
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

  // Filtro por precio
  sortCost.addEventListener("click", () => {
    priceBool = !priceBool;
    changeButtonImage(priceBool, priceSortBtn, priceBtnIcon);
    sortProducts(showProductsInPriceRange(), priceBool, "cost");
  });

  // Filtro por relevancia (usa cantidad vendidos)
  sortRelevancia.addEventListener("click", () => {
    relBool = !relBool;
    changeButtonImage(relBool, relSortBtn, relBtnIcon);
    sortProducts(showProductsInPriceRange(), relBool, "soldCount");
  });

  // Le da funcionalidad al botón de filtro por precio
  filterBtn.addEventListener("click", () => {
    showProductsInPriceRange();
  });

  // Le da funcionalidad al botón que limpia los filtros
  clearFilterBtn.addEventListener("click", () => {
    minCount.value = "";
    maxCount.value = "";
    displayProducts(products);
  });
});
