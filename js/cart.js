// Hace fetch a la api y retorna los datos.
const getData = async (userId) => {
  let response = await fetch(
    `https://japceibal.github.io/emercado-api/user_cart/${userId}.json`
  );
  let data = await response.json();
  return data;
};
//Variable para guardar los productos existentes del localstorage si hay,sino queda un array vacio
let productosCarrito = JSON.parse(localStorage.getItem("productos")) || [];

//Funcion para enviar el producto del carrito de la api al localstorage
function enviarLocalStorage(datos) {
  let producto = {
    titulo: datos.articles[0].name,      // articles es la propiedad del objeto que retorna el fetch.
    imagenSrc: datos.articles[0].image,
    moneda: datos.articles[0].currency,
    precioUnidad: datos.articles[0].unitCost,
    cantidad: datos.articles[0].count
  };
  //para evitar que se duplique el producto del carrito de la api,chequea si ya existe uno así 
  let yaexiste = productosCarrito.some(product => {
    return product.titulo === producto.titulo;
  });
  //condicion de que si no existe un producto igual,envie el producto a la variable y luego al localstorage
  if (!yaexiste) {
    productosCarrito.push(producto);
    localStorage.setItem("productos", JSON.stringify(productosCarrito));
  }
}

// Esta función itera el array con los productos y los muestra en pantalla
function displayData(arrayProductos) {
  const container = document.getElementById("container");
  const container2 = document.getElementById("container2")
  // Es un array con todos los productos del local storage
  arrayProductos.forEach(product => {
    container.innerHTML += `
      <div class="col-md-2 col-lg-2 col-xl-2">
        <img src=${product.imagenSrc} class="rounded-3 pb-3 mx-auto d-block w-50" alt="imagen del producto">
      </div>
      <div class="d-flex justify-content-center col-md-2 col-lg-2 col-xl-3">
        <p>${product.titulo}</p>
      </div>
      <div class="d-flex justify-content-center col-md-2 col-lg-2 col-xl-2">
        <p>${product.moneda} ${product.precioUnidad}</p>
      </div>
      <div class="col-md-2 col-lg-2 col-xl-2 d-flex justify-content-center">
        <button class="btn btn-link px-2 btnRestar" onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
        <i class="fas fa-minus" style="color: orange";"></i>
        </button>
        <input id="form1" min="1" name="quantity" value=${product.cantidad} type="number"
          class="form-control form-control-sm pauta3Inputs"/>
        <button class="btn btn-link px-2 btnAumentar" onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
          <i class="fas fa-plus" style="color: orange;"></i>
        </button>
      </div>
      <div class="d-flex justify-content-center col-md-2 col-lg-2 col-xl-2">
        <p class="fw-bolder pauta3Precio">${product.moneda} ${product.precioUnidad}</p>
      </div>
      <div class="d-flex justify-content-center col-md-2 col-lg-2 col-xl-1 text-end">
        <a href="#!" style="color: orange;"><i class="bi bi-trash"></i></a>
      </div>
      <hr>
  `;
    container2.innerHTML += `
      <p id="prueba"> </p>
  `;
  });

};

// Pauta 3
function actualizarCart(input, data, index) {
  let arrayPrecios = Array.from(document.getElementsByClassName('pauta3Precio'))
  console.log(arrayPrecios)


  arrayPrecios[index].innerHTML = data[index].moneda + " " + (data[index].precioUnidad * input)
}

function addEventListenerAInputs(clase, data) {     //Data directamente de la variable data en linea 3 || Clases agregadas al input y al h5 del precio
  let inputs = Array.from(document.getElementsByClassName(clase));

  inputs.forEach((Element, index) => {
    Element.addEventListener('input', (event) => {
      console.log(event.target.value)
      actualizarCart(event.target.value, data, index)
      actualizarSubtotal(event.target.value, data, index) // Agregado, no se sabe si funciona
    })
  })
}

function addEventListenerABtn(clase, data) {     //Data directamente de la variable data en linea 3 || Clases agregadas al input y al h5 del precio
  let btn = Array.from(document.getElementsByClassName(clase));

  btn.forEach((Element, index) => {

    let inputs = Array.from(document.getElementsByClassName('pauta3Inputs'))

    Element.addEventListener('click', () => {
      actualizarCart(inputs[index].value, data, index)
      actualizarSubtotal(inputs[index].value, data, index) // Agregado, no se sabe si funciona
    })
  })
}

// Corre el programa
document.addEventListener("DOMContentLoaded", async () => {
  let data = await getData(25801);
  console.log(data);
  enviarLocalStorage(data);
  let productsCart = JSON.parse(localStorage.getItem("productos"));
  displayData(productsCart);
  // Pauta 3
  addEventListenerAInputs('pauta3Inputs', productsCart);
  addEventListenerABtn('btnAumentar', productsCart)
  addEventListenerABtn('btnRestar', productsCart)
  // Pauta 3 

});



//E6P1


//Funcion que suma cada precio de producto
function actualizarSubtotal(input, data, index) {




  //////////////////Suma de los productos////////////////////
  let arrayPrecios = Array.from(document.getElementsByClassName('pauta3Precio'));

  
  let subtotal = 0;

 // arrayPrecios.forEach(function (precio) {          suma de los valores sin el cambio de moneda funciona
 //   let numer = precio.innerHTML.substring(4,);     falta implementear el if para cambiar de pesos a dolares.
 //   suma = suma + parseInt(numer);

 // });


  

  ///////////////// Juan Corvo /////////////////////

  arrayPrecios.forEach(function (precio) {
    if (precio.innerHTML.includes("UYU")) {
      subtotal = subtotal + (parseInt(precio.innerHTML.substring(4,)) / 40);
    } else {
      subtotal = subtotal + (parseInt(precio.innerHTML.substring(4,)));
    }   
  });
  console.log(subtotal);

  ////////////////////////////////////////

  //calcula costo de envío -- ahora funciona //////
  let premium = document.getElementById("premiumradio");
  let express = document.getElementById("expressradio");
  let standard = document.getElementById("standardradio");


  let costoEnvio = 0;

  if (standard.checked) {
    costoEnvio = subtotal * 0.05;
  } else if (express.checked) {
    costoEnvio = subtotal * 0.07;
  } else if (premium.checked) {
    costoEnvio = subtotal * 0.15;
  }
  //fin calculo costo de envio //////

  //Calculo Total a Pagar
  let totalAPagar = costoEnvio + subtotal

  //tirar a html
  let dondeVa = document.getElementById("prueba")
  dondeVa.innerHTML = "costo de envio " + costoEnvio + " despues, el subtotal " + subtotal + " el total a pagar " + totalAPagar
}

