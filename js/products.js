// Constante con el endpoint incompleto
// Variable para que pueda usar cualquier id de categoría
// Constante y variable con la terminación para que quede la URL completa
const api = "https://japceibal.github.io/emercado-api/cats_products/";
let catId = localStorage.getItem("catID");
let apiProductos = api + catId + ".json";

// Variable que contendrá el array de productos
let productos = [];

// Constantes con los inputs de precio mínimo y máximo
const minCount = document.getElementById("rangeFilterCountMin");
const maxCount = document.getElementById("rangeFilterCountMax");

// Variable que contendrá el nombre de la categoría de productos
let catNombre = "";

// Constante con la ubicación de donde irá la lista de productos
const contenedorLista = document.getElementById("lista_productos");

// Función que hace fetch a la api
//   Almacena los productos y el nombre de la categoría
//   Llama a la función que muestra los productos
function obtenerInfoProducto(api) {
  fetch(api)
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      productos = datos.products;
      catNombre = datos.catName;
    })
    .then(() => mostrarProductos(productos));
}

// Función que ordena los productos de forma ascendente o descendente
//   Crea un nuevo array de productos
//   Vacía el contenedor de la lista

function clasificarProductos(arr, bool, propiedad) {

  let productosActualizados = arr;
  contenedorLista.innerHTML = "";
  if (bool) {
    productosActualizados.sort((a, b) => a[propiedad] - b[propiedad]);
    mostrarProductos(productosActualizados);
  } else {
    productosActualizados.sort((a, b) => b[propiedad] - a[propiedad]);
    mostrarProductos(productosActualizados);
  }
}

// Función que muestra los productos en pantalla
//   Muestra el nombre de la categoría en pantalla
function mostrarProductos(arr) {
  let divContenido = "";
  for (let i = 0; i < arr.length; i++) {
    let { soldCount, name, currency, cost, description, image, id } = arr[i];
    divContenido += `    
    <div data-idProducto=${id} onclick="setearIdProducto(${id})" class="contenedor_producto pe-auto bg-light text-dark row"> 
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
                    <p class="fs-5">${description} </p> 
                </div>
            </div>
            <div class="col-md-12 col-lg-2 text-center text-md-start text-lg-end text-xg-end">
                <p class="datos">${soldCount} vendidos</p>
            </div>
        </div>
    </div>
    `;
  }
  contenedorLista.innerHTML = divContenido;
  document.getElementById("nombre_categoria").innerText = catNombre;
}

// Función que muestra los productos usando el filtro de precio
function rangoDePrecioProductos() {
  let valorMin = minCount.value || 0;
  let valorMax = maxCount.value || Math.max(...productos.map((e) => e.cost));
  let productosActualizados = productos.filter(
    (e) => e.cost >= valorMin && e.cost <= valorMax
  );
  mostrarProductos(productosActualizados);
  return productosActualizados;
}

// Función que cambia la clase Bootstrap para cambiar la imagen de los botones de ordenar productos 
function cambiarBtnImagen(bool, element, className) {
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
function setearIdProducto(id) {
  localStorage.setItem("ProductID", id);
  window.location = "product-info.html";
}

// Cuando se carga la página
//   Ejecuta función que hace fetch a la API
//   Escucha todos los filtros
document.addEventListener("DOMContentLoaded", () => {
  const barraDeBusqueda = document.getElementById("buscar");
  const clasificarCosto = document.getElementById("precio");
  const clasificarRelevancia = document.getElementById("relevancia");
  const clasificarBtnPrecio = document.getElementById("sortPrecio");
  const clasificarBtnRelevancia = document.getElementById("sortRelevancia");
  const filtrarBtn = document.getElementById("rangeFilterCount");
  const limpiarFiltrarBtn = document.getElementById("clearRangeFilter");

  const iconoPrecioBtn = "fa-sort-numeric";
  const iconoRelevanciaBtn = "fa-sort-amount";

  let precioBool = false;
  let relevanciaBool = false;

  obtenerInfoProducto(apiProductos);

  // Escucha a la barra de busqueda y filtra los productos en tiempo realt barraDeBusqueda.addEventListener("keyup", () => {
  barraDeBusqueda.addEventListener("keyup", () => {
    let arrayProductos = Array.from(document.getElementsByClassName("contenedor_producto"));
    console.log(arrayProductos);
    arrayProductos.forEach((el) => {
      !el.textContent.toLowerCase().includes(barraDeBusqueda.value.toLowerCase())
        ? el.classList.add("buscando")
        : el.classList.remove("buscando");
    });
  });

  // Filtro por precio
  clasificarCosto.addEventListener("click", () => {
    precioBool = !precioBool;
    cambiarBtnImagen(precioBool, clasificarBtnPrecio, iconoPrecioBtn);
    clasificarProductos(rangoDePrecioProductos(), precioBool, "cost");
  });

  // Filtro por relevancia (usa cantidad vendidos)
  clasificarRelevancia.addEventListener("click", () => {
    relevanciaBool = !relevanciaBool;
    cambiarBtnImagen(relevanciaBool, clasificarBtnRelevancia, iconoRelevanciaBtn);
    clasificarProductos(rangoDePrecioProductos(), relevanciaBool, "soldCount");
  });

  // Le da funcionalidad al botón de filtro por precio
  filtrarBtn.addEventListener("click", () => {
    rangoDePrecioProductos();
  });

  // Le da funcionalidad al botón que limpia los filtros
  limpiarFiltrarBtn.addEventListener("click", () => {
    minCount.value = "";
    maxCount.value = "";
    mostrarProductos(productos);
  });
});