const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";


// Funcionalidad del carrusel de imágenes 
let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}
let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

// Función general para obtener datos JSON
let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

// Busca la información del usuario en Local storage
//   Si encuentra la información, pone el nombre de usuario en el navbar
//   Si no encuentra la información, te redirige a la página de Login
document.addEventListener("DOMContentLoaded", function() {
  
  let usuario = localStorage.getItem('user');

  let usuarioParse = JSON.parse(usuario);

  if (usuario=="" || usuario==null) {
    this.location.href="login.html";
  }else{
    let nombreDeUsuario = usuarioParse.email;
    document.getElementById('user').innerHTML= nombreDeUsuario.substring(0, nombreDeUsuario.indexOf('@'));
  }
  
  // Funcionalidad para Logout con el botón salir
  //   Elimina los datos del usuario del Local storage
  //   Redirige a la página de Login
  document.getElementById('salir').addEventListener('click', function() {
    localStorage.removeItem('user');

    location.href="login.html";
  })
  
  // Función para cambiar entre el modo claro y oscuro
function toggleModoOscuro() {
  // Obtener una referencia al elemento 'body' del documento
  const body = document.body;
  // Alternar la clase 'dark-mode' en el elemento 'body'
  body.classList.toggle('dark-mode');

 // Comprobar si la clase 'dark-mode' está presente en 'body' y guardar el estado en localStorage
  if (body.classList.contains('dark-mode')) {
      localStorage.setItem('modoOscuro', 'activado');
  } else {
      localStorage.setItem('modoOscuro', 'desactivado');
  }
}

// Evento que se ejecuta cuando la página se ha cargado completamente
window.addEventListener('load', () => {
  // Obtener el estado del modo oscuro guardado en localStorage
  const modoOscuroGuardado = localStorage.getItem('modoOscuro');
  // Obtener una referencia al elemento 'body'
  const body = document.body;

  // Si el modo oscuro está guardado como 'activado', activarlo y marcar la casilla de verificación
  if (modoOscuroGuardado === 'activado') {
      body.classList.add('dark-mode'); // Activar el modo oscuro si está guardado
      document.getElementById('modoOscuroToggle').checked = true; // Marcar la casilla de verificación
  }
});

// Agregar un evento de cambio a la casilla de verificación
const modoOscuroCheckbox = document.getElementById('modoOscuroToggle');
modoOscuroCheckbox.addEventListener('change', toggleModoOscuro);

});