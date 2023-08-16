const apiCars =
  "https://japceibal.github.io/emercado-api/cats_products/101.json";

const contenedorLista = document.getElementById("lista-productos");

document.addEventListener("DOMContentLoaded", () => {
  getCars();
});

function getCars() {
  fetch(apiCars)
    .then((response) => response.json())
    .then((data) => showCars(data.products));
}

function showCars(datos) {
  for (let i = 0; i < datos.length; i++) {
    let contenedor = document.createElement("div");
    contenedor.classList.add("list-group-item");
    contenedor.classList.add("list-group-item-action");
    contenedor.innerHTML = `
    <div class="row">
            <div class="col-3">
                <img class="img-thumbnail" src=${datos[i].image}>
            </div>
    <div class="col">
    <div class="d-flex w-100 justify-content-between">
        <div class="mb-1">
            <h3 class="nombre">${datos[i].name} - ${datos[i].currency} ${datos[i].cost}</h3>
            <p class="desc">${datos[i].description} </p> 
        </div>
        <p class="vendidos">${datos[i].soldCount} vendidos</p>
    </div>
     </div>
      </div>
    `;

    contenedorLista.appendChild(contenedor);
  }
}
