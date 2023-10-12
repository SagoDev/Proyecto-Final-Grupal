// Corre el programa
document.addEventListener("DOMContentLoaded", async () => {
    let data = await getData(25801);
    console.log(data);
    displayData(data);
  });
  
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
        <div class="col-md-2 col-lg-2 col-xl-2">
          <img src=${product.image} class="rounded-3 mx-auto d-block w-50" alt="imagen del producto">
        </div>
        <div class="d-flex justify-content-center col-md-2 col-lg-2 col-xl-3">
          <p>${product.name}</p>
        </div>
        <div class="d-flex justify-content-center col-md-2 col-lg-2 col-xl-2">
          <p>${product.currency} ${product.unitCost}</p>
        </div>
        <div class="col-md-2 col-lg-2 col-xl-2 d-flex justify-content-center">
          <button class="btn btn-link px-2" onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
           <i class="fas fa-minus" style="color: orange";"></i>
          </button>

          <input id="form1" min="1" name="quantity" value=${product.count} type="number"
            class="form-control form-control-sm"/>

          <button class="btn btn-link px-2" onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
            <i class="fas fa-plus" style="color: orange;"></i>
          </button>
        </div>
        <div class="d-flex justify-content-center col-md-2 col-lg-2 col-xl-2">
          <p class="fw-bolder">${product.currency} ${product.unitCost}</p>
        </div>
        <div class="d-flex justify-content-center col-md-2 col-lg-2 col-xl-1 text-end">
          <a href="#!" style="color: orange;"><i class="bi bi-trash"></i></a>
        </div>
    `;
  }
    container.innerHTML = content;
  };