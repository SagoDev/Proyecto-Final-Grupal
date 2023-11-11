const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL =
  "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL =
  "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

// Funcionalidad del carrusel de imágenes 
let mostrarCarrusel = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}
let esconderCarrusel = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
};

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
};

function establecerSrcImagen(idElemento) {
  const contenedorImagen = document.getElementById(idElemento);
  if (localStorage.getItem("fotoPerfil") != undefined) {
    contenedorImagen.src = localStorage.getItem("fotoPerfil");
  }
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
});

const toggleTema = () => {
  if (document.body.getAttribute("data-bs-theme") === "dark") {
    document.body.setAttribute("data-bs-theme", "light");
    localStorage.setItem("theme", "light");
  } else {
    document.body.setAttribute("data-bs-theme", "dark");
    localStorage.setItem("theme", "dark");
  }
};

const aplicarTemaAlCargar = () => {
  if (localStorage.getItem("theme")) {
    if (localStorage.getItem("theme") === "dark") {
      document.body.setAttribute("data-bs-theme", "dark");
    } else {
      document.body.setAttribute("data-bs-theme", "light");
    }
  }
};


aplicarTemaAlCargar();

document.getElementById("toggle_theme").addEventListener("click", toggleTema);

window.addEventListener("load", () => {
  
  document.getElementById("bye").addEventListener("click", function () {
    localStorage.removeItem("user");
    location.href = "login.html";
  });
});