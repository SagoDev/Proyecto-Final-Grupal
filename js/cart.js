// Hace fetch a la api y retorna los datos.
const conseguirDatos = async (idUsuario) => {
  let respuesta = await fetch(
    CART_INFO_URL + idUsuario + EXT_TYPE
  );
  let datos = await respuesta.json();
  return datos;
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
  let productoExiste = productosCarrito.some(product => {
    return product.titulo === producto.titulo;
  });
  //condicion de que si no existe un producto igual,envie el producto a la variable y luego al localstorage
  if (!productoExiste) {
    productosCarrito.push(producto);
    localStorage.setItem("productos", JSON.stringify(productosCarrito));
  }
}

// Esta función itera el array con los productos y los muestra en pantalla
function mostrarDatos(arrayProductos) {
  const container = document.getElementById("container");
  // Es un array con todos los productos del local storage
  arrayProductos.forEach((product, index) => {
    container.innerHTML += `
    <div data-index=${index} class="row justify-content-center align-items-center productoABorrar">
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
          <a href="#!" style="color: orange;"><i id=${index} class="bi bi-trash btnBorrar"></i></a>
        </div>
        <hr>
      </div>
     
  `;
  });

}

function borrarProducto(id) {

  let lista = Array.from(document.getElementsByClassName('productoABorrar'));
  let padre = document.getElementById('container')
  let indexElementoABorrar = lista.findIndex(producto => producto.dataset.index === id);
  let elementoABorrar = lista[indexElementoABorrar]
  padre.removeChild(elementoABorrar)

  actualizarSubtotal();
  let array = JSON.parse(localStorage.getItem('productos'));
  Array.from(array);
  array.splice(indexElementoABorrar, 1)
  localStorage.setItem('productos', JSON.stringify(array));
};

// Pauta 3
function actualizarCarrito(input, data, index) {
  let arrayPrecios = Array.from(document.getElementsByClassName('pauta3Precio'))


  arrayPrecios[index].innerHTML = data[index].moneda + " " + (data[index].precioUnidad * input)
}

function agregarEventosInputs(clase, data) {     //Data directamente de la variable data en linea 3 || Clases agregadas al input y al h5 del precio
  let inputs = Array.from(document.getElementsByClassName(clase));

  inputs.forEach((Element, index) => {
    Element.addEventListener('input', (event) => {
      actualizarCarrito(event.target.value, data, index)
      actualizarSubtotal() // Agregado, no se sabe si funciona
    })
  })
}

function agregarEventosBotones(clase, data) {     //Data directamente de la variable data en linea 3 || Clases agregadas al input y al h5 del precio
  let btn = Array.from(document.getElementsByClassName(clase));

  btn.forEach((Element, index) => {

    let inputs = Array.from(document.getElementsByClassName('pauta3Inputs'))

    Element.addEventListener('click', () => {
      actualizarCarrito(inputs[index].value, data, index)
      actualizarSubtotal() // Agregado, no se sabe si funciona
    })
  })
}


function validar(arrayinputs, inputB, radio1, radio2, parrafo) {
  const inputIds = ["calle", "numero", "esquina"];
  let inputsCredit = Array.from(arrayinputs)
  let mensajeError = document.getElementById("divInvalidFB");
  if (radio1.checked) {
    inputsCredit.forEach((input) => {
      input.required = true;
      inputIds.push(input.id);
    })
  };
  radio2.checked ? (inputB.required = true, inputIds.push(inputB.id)) : parrafo.classList.add("is-invalid");
  inputIds.forEach((id) => {
    const input = document.getElementById(id);

    if (!input.checkValidity()) {
      input.classList.remove("is-valid");
      input.classList.add("is-invalid");
      (input.id === "calle" || input.id === "numero" || input.id === "esquina")
        ? (input.classList.remove("border-secondary"), input.classList.add("border-danger"))
        : (parrafo.classList.add("is-invalid"), mensajeError.innerHTML = "Debe completar todos los campos");
    } else {
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
      (input.id === "calle" || input.id === "numero" || input.id === "esquina")
        ? (input.classList.remove("border-danger"), input.classList.add("border-secondary"))
        : parrafo.classList.remove("is-invalid");
    }
  })
};

function mostrarMensaje(radio1, radio2, parrafo) {
  let todosLosInputs = Array.from(document.getElementsByClassName("form-control"));
  if (radio1.checked || radio2.checked) {
    if ((todosLosInputs.every((campo) => campo.checkValidity()))) {
      parrafo.classList.remove("is-invalid");
      Swal.fire({
        icon: 'success',
        iconColor: '#1ea00c',
        background: '#aef8a5',
        title: 'Has comprado con éxito!',
        width: '50%',
      })
    };
  };
}
function validarInputsModificados(parrafo) {
  let inputsVerificar = Array.from(document.getElementsByClassName("form-control"));
  inputsVerificar.forEach((input) => {
    input.addEventListener("change", () => {
      if (input.checkValidity()) {
        input.classList.remove("is-invalid")
        input.classList.add("is-valid")
        input.classList.remove("border-danger")
      }
      if ((inputsVerificar.every((campo) => campo.checkValidity()))) {
        parrafo.classList.remove("is-invalid");
      }
    });
  })
}

//Funcion que suma cada precio de producto
function actualizarSubtotal() {

  let arrayPrecios = Array.from(document.getElementsByClassName('pauta3Precio'));
  let subtotal = 0;

  arrayPrecios.forEach(function (precio) {
    if (precio.innerHTML.includes("UYU")) {
      subtotal = subtotal + (parseInt(precio.innerHTML.substring(4,)) / 40);
    } else {
      subtotal = subtotal + (parseInt(precio.innerHTML.substring(4,)));
    }
  });

  //calcula costo de envío -- ahora funciona //////
  let premium = document.getElementById("premiumRadio");
  let express = document.getElementById("expressRadio");
  let standard = document.getElementById("standardRadio");


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
  let cPrecioSuma = document.getElementById('contenedorSuma');
  let cEnvio = document.getElementById('contenedorEnvio');
  let cTotal = document.getElementById('contenedorTotal');


  cPrecioSuma.innerHTML = "USD " + subtotal.toFixed(2);
  cEnvio.innerHTML = "USD " + costoEnvio.toFixed(2);
  cTotal.innerHTML = "USD " + totalAPagar.toFixed(2);

}

function escucharRadio() {
  let standard = document.getElementById('standardRadio');
  let express = document.getElementById('expressRadio');
  let premium = document.getElementById('premiumRadio');

  standard.addEventListener("click", actualizarSubtotal);
  express.addEventListener("click", actualizarSubtotal);
  premium.addEventListener("click", actualizarSubtotal);
};

// Corre el programa
document.addEventListener("DOMContentLoaded", async () => {
  let datos = await conseguirDatos(25801);
  enviarLocalStorage(datos);
  let productsCart = JSON.parse(localStorage.getItem("productos"));  
  mostrarDatos(productsCart);

  agregarEventosInputs('pauta3Inputs', productsCart);
  agregarEventosBotones('btnAumentar', productsCart);
  agregarEventosBotones('btnRestar', productsCart);

  let btnRadioCredito = document.getElementById("Tarjeta-de-credito");
  let btnRadioBancaria = document.getElementById("Transferencia-bancaria");
  let inputsTar = document.getElementById("tarjeta").getElementsByClassName("form-control")
  let inputTransferenciaBancaria = document.getElementById("inputBank")
  let fDM = document.getElementById("fDM")

  let pInvalidoOValido = document.getElementById("pOpcion");

  btnRadioCredito.addEventListener("click", () => {
    inputTransferenciaBancaria.disabled = true;
    inputTransferenciaBancaria.value = "";
    inputTransferenciaBancaria.classList.remove("is-invalid");
    inputTransferenciaBancaria.classList.remove("is-valid");
    for (input of inputsTar) {
      input.disabled = false;
    }
    fDM.innerHTML = "Tarjeta de Crédito";
    pInvalidoOValido.classList.remove("is-invalid");
  })
  btnRadioBancaria.addEventListener("click", () => {
    for (input of inputsTar) {
      input.disabled = true;
      input.value = "";
      input.classList.remove("is-invalid");
      input.classList.remove("is-valid");
    }
    inputTransferenciaBancaria.disabled = false;
    fDM.innerHTML = "Transferencia Bancaria";
    pInvalidoOValido.classList.remove("is-invalid");
  })

  let btnFinalizarCompra = document.getElementById("finalizar-compra");
  btnFinalizarCompra.addEventListener("click", () => {
    validar(inputsTar, inputTransferenciaBancaria, btnRadioCredito, btnRadioBancaria, pInvalidoOValido);
    validarInputsModificados(pInvalidoOValido);
    mostrarMensaje(btnRadioCredito, btnRadioBancaria, pInvalidoOValido);
  })


  actualizarSubtotal();
  escucharRadio();

  let productosEnLista = document.getElementById('container');
  productosEnLista.addEventListener('click', (e) => {
    if (e.target.classList.contains('btnBorrar')) {
      let id = e.target.id;
      borrarProducto(id);
    }
  });
});