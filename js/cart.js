// Corre el programa
document.addEventListener("DOMContentLoaded", async () => {
    let data = await getData(25801);
    console.log(data);
    enviarLocalStorage(data);
    let productsCart= JSON.parse(localStorage.getItem("productos"));
    displayData(productsCart);
  });
  
  // Hace fetch a la api y retorna los datos.
  const getData = async (userId) => {
    let response = await fetch(
      `https://japceibal.github.io/emercado-api/user_cart/${userId}.json`
    );
    let data = await response.json();
    return data;
  };
  //Variable para guardar los productos existentes del localstorage si hay,sino queda un array vacio
  let productosCarrito=JSON.parse(localStorage.getItem("productos")) || [];
  //Funcion para enviar el producto del carrito de la api al localstorage
  function enviarLocalStorage(datos){
    let producto={
      titulo:datos.articles[0].name,      // articles es la propiedad del objeto que retorna el fetch.
      imagenSrc:datos.articles[0].image,
      moneda:datos.articles[0].currency,
      precioUnidad:datos.articles[0].unitCost,
      cantidad:datos.articles[0].count
    };
    //para evitar que se duplique el producto del carrito de la api,chequea si ya existe uno así 
    let yaexiste= productosCarrito.some(product=>{
      return product.titulo===producto.titulo;
    });
    //condicion de que si no existe un producto igual,envie el producto a la variable y luego al localstorage
    if(!yaexiste){productosCarrito.push(producto);
    localStorage.setItem("productos",JSON.stringify(productosCarrito));
    }
  }

  // Esta función itera el array con los productos y los muestra en pantalla
  function displayData(arrayProductos) {
    const container = document.getElementById("container");
    // Es un array con todos los productos del local storage
    arrayProductos.forEach(product => {
      container.innerHTML+= `
      <div class="col-md-2 col-lg-2 col-xl-2">
        <img src=${product.imagenSrc} class="rounded-3 pb-2 mx-auto d-block w-50" alt="imagen del producto">
      </div>
      <div class="d-flex justify-content-center col-md-2 col-lg-2 col-xl-3">
        <p>${product.titulo}</p>
      </div>
      <div class="d-flex justify-content-center col-md-2 col-lg-2 col-xl-2">
        <p>${product.moneda} ${product.precioUnidad}</p>
      </div>
      <div class="col-md-2 col-lg-2 col-xl-2 d-flex justify-content-center">
        <button class="btn btn-link px-2" onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
         <i class="fas fa-minus" style="color: orange";"></i>
        </button>
        <input id="form1" min="1" name="quantity" value=${product.cantidad} type="number"
          class="form-control form-control-sm pauta3Inputs"/>
        <button class="btn btn-link px-2" onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
          <i class="fas fa-plus" style="color: orange;"></i>
        </button>
      </div>
      <div class="d-flex justify-content-center col-md-2 col-lg-2 col-xl-2">
        <p class="fw-bolder pauta3Precio">${product.moneda} ${product.precioUnidad}</p>
      </div>
      <div class="d-flex justify-content-center col-md-2 col-lg-2 col-xl-1 text-end">
        <a href="#!" style="color: orange;"><i class="bi bi-trash"></i></a>
      </div>
      <hr>`;
    });
  };