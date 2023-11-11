// Cuando se carga la página
//   Escucha el click en las categorías que se muestran
//   Redirige a su categoría correspondiente
//   Funcionalidad de los slides
document.addEventListener("DOMContentLoaded", function () {
  const imgFondo = document.getElementById("cover");
  document.getElementById("autos").addEventListener("click", function () {
    localStorage.setItem("catID", 101);
    window.location = "products.html";
  });
  document.getElementById("juguetes").addEventListener("click", function () {
    localStorage.setItem("catID", 102);
    window.location = "products.html";
  });
  document.getElementById("muebles").addEventListener("click", function () {
    localStorage.setItem("catID", 103);
    window.location = "products.html";
  });

  // Cambia la imágen de fondo dependiendo de si body tiene el atributo del tema claro u oscuro 
  function cambiarTemaFondo() {
    let temaActual = document.body.getAttribute("data-bs-theme");
    if (temaActual === "light") {
      imgFondo.src = "./img/cover_back3.png";
    } else {
      imgFondo.src = "./img/cover_back_dark.png";
    }
  }
  
  
  const toggleFondo = document.getElementById("toggle_theme");
  toggleFondo.addEventListener("click", cambiarTemaFondo);
  
  cambiarTemaFondo();
});
