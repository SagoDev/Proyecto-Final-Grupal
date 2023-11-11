const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";


// Funcionalidad del carrusel de imágenes 
let mostrarCarrusel = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}
let esconderCarrusel = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

// Función general para obtener datos JSON
let getJSONData = function (url) {
  let resultado = {};
  mostrarCarrusel();
  return fetch(url)
    .then(respuesta => {
      if (respuesta.ok) {
        return respuesta.json();
      } else {
        throw Error(respuesta.statusText);
      }
    })
    .then(function (respuesta) {
      resultado.status = 'ok';
      resultado.data = respuesta;
      esconderCarrusel();
      return resultado;
    })
    .catch(function (error) {
      resultado.status = 'error';
      resultado.data = error;
      esconderCarrusel();
      return resultado;
    });
}

function establecerSrcImagen(idElemento) {
  const contenedorImagen = document.getElementById(idElemento);
  if (localStorage.getItem("fotoPerfil") != undefined) {
    contenedorImagen.src = localStorage.getItem("fotoPerfil");
  }
}

// Cuando se carga la página
//   Busca la información del usuario en Local storage
//   Si encuentra la información, pone el nombre de usuario en el navbar
//   Si no encuentra la información, te redirige a la página de Login
document.addEventListener("DOMContentLoaded", function() {
  establecerSrcImagen("foto_nav_bar");
  
  let usuario = localStorage.getItem('user');

  let usuarioParse = JSON.parse(usuario);

  if (usuario == "" || usuario == null) {
    this.location.href = "login.html";
  } else {
    let nombreDeUsuario = usuarioParse.email;
    document.getElementById('user').innerHTML = nombreDeUsuario.substring(0, nombreDeUsuario.indexOf('@'));
  }


  //  Cambia entre el modo claro y modo oscuro
  function activarModoOscuro() {

    const btnFilrar = document.getElementById('rangeFilterCount');
    const btnLimpiar = document.getElementById('clearRangeFilter');

    //  Alterna la clase 'dark-mode' en el elemento 'body'
    document.body.classList.toggle('dark-mode');

    //  Comprueba si la clase 'dark-mode' está en 'body' y guarda el estado en localStorage
    //    Si está activo el modo oscuro le agrega una clase
    //    si está desactivado, le quita la clase
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('modoOscuro', 'activado');
      btnFilrar.classList.add('dark-mode-button-active');
      btnLimpiar.classList.add('dark-mode-button-active');
    } else {
      localStorage.setItem('modoOscuro', 'desactivado');
      btnFilrar.classList.remove('dark-mode-button-active');
      btnLimpiar.classList.remove('dark-mode-button-active');
    }
  }

  //  Cuando la página se cargó completamente
  //    
  window.addEventListener('load', () => {

    const modoOscuroGuardado = localStorage.getItem('modoOscuro');

    //  Si el modo oscuro está guardado como 'activado', lo activa y verifica en 'modoOscuroToggle'
    //    Si está activo el modo oscuro le agrega una clase
    if (modoOscuroGuardado === 'activado') {
      document.body.classList.add('dark-mode');
      document.getElementById('modoOscuroToggle').checked = true;
      document.getElementById('rangeFilterCount').classList.add('dark-mode-button-active');
      document.getElementById('clearRangeFilter').classList.add('dark-mode-button-active');
    }
  });

  // Evento de cambio a la casilla de verificación del Modo Oscuro
  const modoOscuroCheckbox = document.getElementById('modoOscuroToggle');
  modoOscuroCheckbox.addEventListener('change', activarModoOscuro);


  //  Evento de cerrar sesión
  document.getElementById("bye").addEventListener('click', function () {
    localStorage.removeItem('user');
    location.href = "login.html";
  })
});
