// Guardamos en una constante el endpoint que contiene la info de los productos de categoría productos

const api = "https://japceibal.github.io/emercado-api/cats_products/";
let catId = localStorage.getItem("catID");
let apiProducts = api + catId + ".json";

// Se declara una variable que contendrá el array de productos
let products = [];
// Guardamos en constantes los inputs de precio mínimo y máximo
const minCount = document.getElementById("rangeFilterCountMin");
const maxCount = document.getElementById("rangeFilterCountMax");

// Esta variable contendrá el nombre de la categoría de productos
let catName = "";

// Guardamos en una constante el elemento con id lista-productos
// A este elemento le vamos a agregar los elementos con la información de cada producto como hijo

const contenedorLista = document.getElementById("lista-productos");

// hacemos fetch al endpoint con la información de los productos y los adjunta al elemento contenedorLista

function getProductsData(api) {
  fetch(api)
    .then((response) => response.json())
    .then((data) => {
      // Guardamos en una variable el array con la info de los productos para no tener que repetir el fetch
      products = data.products;
      // Guardamos en una variable el nombre de la categoría de los productos para mostrarlo en pantalla
      catName = data.catName;
    })
    // Mostramos los productos en pantalla
    .then(() => displayProducts(products));
}

// Ordena los productos de forma ascendente o descendente
function sortProducts(arr, bool, property) {
  // Se pasa el parámetro a una variable para no mutar el array original
  let currentProducts = arr;
  // Limpiamos el contenedor que tiene los productos
  contenedorLista.innerHTML = "";
  // Si el booleano es true se ordena el array de forma ascendente y se muestra en pantalla
  if (bool) {
    currentProducts.sort((a, b) => a[property] - b[property]);
    displayProducts(currentProducts);
    // Si no, de forma descendente
  } else {
    currentProducts.sort((a, b) => b[property] - a[property]);
    displayProducts(currentProducts);
  }
}

// Recibe un array con productos y los muestra en pantalla
// Iteramos el array que tiene la info de cada producto, por cada objeto del array creamos un elemento html y los vamos adjuntando a un elemento padre del html

function displayProducts(arr) {
  // En esta variable va a ir todo el código html con los productos
  let divContent = "";
  // Se itera el array con los productos
  // Por cada producto, se genera un elemento
  for (let i = 0; i < arr.length; i++) {
    // Desestructuración del objeto actual para que sea más fácil acceder a cada una de sus propiedades.
    // Sería como guardar las propiedades del objeto en variables
    let { soldCount, name, currency, cost, description, image, id} = arr[i];
    divContent += `
    <div onclick="setProductID(${id})" class="contenedor-producto">
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
  // Se adjuntan todos los productos a un elemento padre definido anteriormente en html
  contenedorLista.innerHTML = divContent;
  // Se muestra en pantalla el nombre de la categoría correspondiente
  document.getElementById("nombreCategoria").innerText = catName;
}

// Muestra los productos dentro de un rango de precio especificado
function showProductsInPriceRange() {
  // Se guarda el valor del input en una variable. Si no hay ningún valor, se pone 0 por defecto.
  let minValue = minCount.value || 0;
  // corremos map sobre el array que contiene los productos para obtener el costo de cada uno
  // los ... separa los elementos del array como elementos individuales para que math max pueda sacar el mayor de estos
  let maxValue = maxCount.value || Math.max(...products.map((e) => e.cost));

  // Guardamos en una variable el array filtrado para que solo queden los productos que están dentro del rango de precio
  let currentProducts = products.filter(
    (e) => e.cost >= minValue && e.cost <= maxValue
  );
  // Se muestran los productos filtrados en pantalla
  displayProducts(currentProducts);
  // Se retorna el array con los productos el cual nos servirá como parámetro en otras funciones.
  return currentProducts;
}

// Esta función le cambia la clase a un elemento, la usamos para cambiar su ícono
// Recibe un booleano para decidir qué ícono se le pone al elemento
// Recibe un elemento al que se le aplicará la ícono
// Recibe una clase de bootstrap que especifica qué ícono es.
function changeButtonImage(bool, element, className) {
  if (bool) {
    element.classList.remove(`${className}-down`);
    element.classList.add(`${className}-up`);
  } else {
    element.classList.remove(`${className}-up`);
    element.classList.add(`${className}-down`);
  }
}

function setProductID(id) {
  localStorage.setItem("ProductID", id);
  window.location = "product-info.html";
}

// Cuando carga el DOM se corre se declaran constantes y variables con elementos
// Se muestran los productos en pantalla
// Se agregan eventlisteners a los botones y al buscador

document.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.getElementById("buscar");
  const sortCost = document.getElementById("precio");
  const sortRelevancia = document.getElementById("relevancia");
  const priceSortBtn = document.getElementById("sortPrecio");
  const relSortBtn = document.getElementById("sortRelevancia");
  const filterBtn = document.getElementById("rangeFilterCount");
  const clearFilterBtn = document.getElementById("clearRangeFilter");

  // Estas constantes son clases de bootstrap que representan íconos
  const priceBtnIcon = "fa-sort-numeric";
  const relBtnIcon = "fa-sort-amount";

  // Estos son booleanos que usaremos en las funciones de ordenado
  let priceBool = false;
  let relBool = false;

  // Hacemos fetch a la api, guardamos los datos en un array y mostramos los productos en pantalla
  getProductsData(apiProducts);

  // Implementamos un buscador de productos el se actualiza en tiempo real
  searchBar.addEventListener("keyup", () => {
    // Con Array.from transformamos un objeto en un array con los productos y lo guradamos en una variable
    let arrayProducts = Array.from(
      document.getElementsByClassName("contenedor-producto")
    );
    arrayProducts.forEach((el) => {
      !el.textContent.toLowerCase().includes(searchBar.value.toLowerCase())
        ? el.classList.add("buscando")
        : el.classList.remove("buscando");
    });
  });

  // Le agregamos un eventListener a el botón que ordena los productos por precio
  sortCost.addEventListener("click", () => {
    // Revertimos el valor del booleano para que la función si hay que ordenar de forma ascendente o descendente
    priceBool = !priceBool;
    // Cambiamos el ícono del botón
    changeButtonImage(priceBool, priceSortBtn, priceBtnIcon);
    // Ordenamos los productos y los mostramos en pantalla
    sortProducts(showProductsInPriceRange(), priceBool, "cost");
  });

  // Le agregamos un eventListener a el botón que ordena los productos por cantidad de vendidos
  sortRelevancia.addEventListener("click", () => {
    relBool = !relBool;
    changeButtonImage(relBool, relSortBtn, relBtnIcon);
    sortProducts(showProductsInPriceRange(), relBool, "soldCount");
  });

  // Le agregamos un eventListener a el botón que muestra los productos que entran en el rango de precio
  filterBtn.addEventListener("click", () => {
    showProductsInPriceRange();
  });

  // Le agregamos un eventListener a el botón que limpia los filtros.
  clearFilterBtn.addEventListener("click", () => {
    // Se limpian los inputs de precio mínimo y máximo
    minCount.value = "";
    maxCount.value = "";
    // Se muestran los productos sin modificar en pantalla
    displayProducts(products);
  });
});
