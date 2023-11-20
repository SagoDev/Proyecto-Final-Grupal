const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
let arrayCategoriasActual = [];
let criterioClasificacionActual = undefined;
let minCount = undefined;
let maxCount = undefined;


// Ordena un arreglo según el criterio que le pidas
//    Criterios: Nombre ascendente / Nombre descendente / Cantidad de productos
function clasificarCategorias(criterio, array) {
  let resultado = [];
  if (criterio === ORDER_ASC_BY_NAME) {
    resultado = array.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  } else if (criterio === ORDER_DESC_BY_NAME) {
    resultado = array.sort(function (a, b) {
      if (a.name > b.name) {
        return -1;
      }
      if (a.name < b.name) {
        return 1;
      }
      return 0;
    });
  } else if (criterio === ORDER_BY_PROD_COUNT) {
    resultado = array.sort(function (a, b) {
      let aCount = parseInt(a.productCount);
      let bCount = parseInt(b.productCount);

      if (aCount > bCount) {
        return -1;
      }
      if (aCount < bCount) {
        return 1;
      }
      return 0;
    });
  }

  return resultado;
}

//  Setea el id de una categoría en local storage
//  Redirige a la página de la categoría seleccionada
function setearIdCategoria(id) {
  localStorage.setItem("catID", id);
  window.location = "products.html";
}



// Muestra la lista de categorías
//    Crea el array con la lista de categorías
//    Lo agrega en el container en HTML
function mostrarListaCatergorias() {
  let contenidoHtmlAdjuntar = "";
  console.log(arrayCategoriasActual)
  for (let i = 0; i < arrayCategoriasActual.length; i++) {
    let category = arrayCategoriasActual[i];

    if (
      (minCount == undefined ||
        (minCount != undefined &&
          parseInt(category.productCount) >= minCount)) &&
      (maxCount == undefined ||
        (maxCount != undefined && parseInt(category.productCount) <= maxCount))
    ) {
      contenidoHtmlAdjuntar += `
            <div onclick="setearIdCategoria(${category.id})" class="shadow list-group-item list-group-item-action cursor-active">
                <div class="row d-flex justify-content-center">
                    <div class="col-sm-12 col-md-3">
                        <img src="${category.imgSrc}" alt="${category.description}" class="img-thumbnail">
                    </div>
                    <div class="row col-sm-12 col-md-7 text-sm-center text-md-start">
                      <p class="fs-2 f-releway">${category.name}</p>
                      <p class="fs-5 f-releway">${category.description}</p>
                    </div>
                    <div class="col-sm-12 col-md-2 text-center d-flex justify-content-center align-items-center">
                          <p class="text-muted">${category.productCount} artículos</p>
                    </div>
                </div>
            </div>
            `;
    }

    document.getElementById("cat-list-container").innerHTML =
      contenidoHtmlAdjuntar;
  }
}


//  Utiliza clasificarCategorias y muestra las caterogías ordenadas con ShowCategories
function clasificarYMostrarCategorias(clasificarCriterio, arrayCategorias) {
  criterioClasificacionActual = clasificarCriterio;

  if (arrayCategorias != undefined) {
    arrayCategoriasActual = arrayCategorias;
  }

  arrayCategoriasActual = clasificarCategorias(
    criterioClasificacionActual,
    arrayCategoriasActual
  );

  mostrarListaCatergorias();
}

// Cuando se carga la página
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(CATEGORIES_URL).then(function (objetoResultante) {
    if (objetoResultante.status === "ok") {
      arrayCategoriasActual = objetoResultante.data;
      mostrarListaCatergorias();
    }
  });

  rompiendoCosas()

  //  Escucha los botones para reordenar el array de categorías
  document.getElementById("sortAsc").addEventListener("click", function () {
    clasificarYMostrarCategorias(ORDER_ASC_BY_NAME);
  });

  document.getElementById("sortDesc").addEventListener("click", function () {
    clasificarYMostrarCategorias(ORDER_DESC_BY_NAME);
  });
});