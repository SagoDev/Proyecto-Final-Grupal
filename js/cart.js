// Corre el programa
document.addEventListener("DOMContentLoaded", async () => {
  let data = await getData(25801);
  console.log(data);
  displayData(data);
});

// let test = `<div class="card rounded-3 mb-4">
// <div class="card-body p-4">
//   <div class="row d-flex justify-content-between align-items-center">
//     <div class="col-md-2 col-lg-2 col-xl-2">
//       <img
//         src=${product.image}
//         class="img-fluid rounded-3" alt="hola">
//     </div>
//     <div class="d-flex justify-content-center col-md-3 col-lg-3 col-xl-3">
//     <div>
//       <p class="lead text-muted">Nombre</p>
//       <p class="lead fw-normal mb-2">${product.name}</p>
//       </div>
//     </div>
//     <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
//       <button class="btn btn-link px-2"
//         onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
//         <i class="fas fa-minus"></i>
//       </button>

//       <input id="form1" min="0" name="quantity" value=${product.count} type="number"
//         class="form-control form-control-sm" />

//       <button class="btn btn-link px-2"
//         onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
//         <i class="fas fa-plus"></i>
//       </button>
//     </div>
//     <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
//       <h5 class="mb-0">${product.currency} ${product.unitCost}</h5>
//     </div>
//     <div class="col-md-1 col-lg-1 col-xl-1 text-end">
//       <a href="#!" class="text-danger"><i class="fas fa-trash fa-lg"></i></a>
//     </div>
//   </div>
// </div>
// </div>`;

// Hace fetch a la api y retorna los datos.
const getData = async (userId) => {
  let response = await fetch(
    `https://japceibal.github.io/emercado-api/user_cart/${userId}.json`
  );
  let data = await response.json();
  return data;
};

// Esta función itera el array con los productos y los muestra en pantalla
const displayData = (products) => {
  const container = document.getElementById("container");

  let content = "";
  // articles es la propiedad del objeto que retorna el fetch.
  // Es un array con todos los productos
  for (let product of products.articles) {
    content = `
      
      <div class="card mb-3">
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <div class="d-flex flex-row align-items-center">
            <div>
              <img
                src=${product.image}
                class="img-fluid rounded-3" alt="Shopping item" style="width: 65px;">
            </div>
            <div class="ms-3">
              <h5>${product.name}</h5>
            </div>
          </div>
          <div class="w-50 d-flex flex-row align-items-center">
            <div class="w-50">
            <input type="number" value=${product.count}>
              <h5 class="fw-normal mb-0">${product.count}</h5>
            </div>
            <div class="w-50">
              <h5 class="mb-0">${product.currency} ${product.unitCost}</h5>
            </div>
            <a href="#!" style="color: #cecece;"><i class="fas fa-trash-alt"></i></a>
          </div>
        </div>
      </div>
    </div>
      `;
  }
  container.innerHTML = content;
};
