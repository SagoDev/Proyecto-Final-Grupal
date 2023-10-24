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
    })
  })
}

function addEventListenerABtn(clase, data) {     //Data directamente de la variable data en linea 3 || Clases agregadas al input y al h5 del precio
  let btn = Array.from(document.getElementsByClassName(clase));

  btn.forEach((Element, index) => {

    let inputs = Array.from(document.getElementsByClassName('pauta3Inputs'))

    Element.addEventListener('click', () => {
      actualizarCart(inputs[index].value, data, index)
    })
  })
}
//entrega6 pauta 3,probando funcion validar
function addInvalidClass(){  
  let input1=document.getElementById("calle");
  let input2=document.getElementById("numero");
  let input3=document.getElementById("esquina");  

  if(input1.value === ""){
  input1.classList.add('is-invalid');
  input1.classList.remove("border-secondary");
  input1.classList.add("border-danger")
  }else{
  input1.classList.remove('is-invalid');
  input1.classList.remove("border-danger");
  input1.classList.add("border-secondary")}
  
  input2.value ===""
  ?input2.classList.add('is-invalid')
  :input2.classList.remove('is-invalid');
  
  input3.value===""
  ?input3.classList.add('is-invalid')
  :input3.classList.remove('is-invalid');
  
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
 
  let btnFinalizarCompra= document.getElementById("finalizar-compra");
  btnFinalizarCompra.addEventListener("click",()=>{
    addInvalidClass();
  })

});