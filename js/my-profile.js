/* Funcion universal para mostrar los datos guardados del local storage. 
Tiene que conicidir el id input con atributo del objeto user en el local Storage... */

function traerDatos(campo) {
  let usuario = JSON.parse(localStorage.getItem("user"));
  let usuarioCampo = usuario[campo];

  let inputValue = document.getElementById(campo);
  inputValue.value = usuarioCampo;
}

function mostrarTodosLosDatos() {
  let usuario = JSON.parse(localStorage.getItem("user"));
  for (campo in usuario) {
    if (campo != "pass") {
      traerDatos(campo);
    }
  }
}

function guardarEnLocalStorage() {
  let usuario = JSON.parse(localStorage.getItem("user"));
  let listaInputs = document.getElementsByClassName("form-control");

  for (const input of listaInputs) {
    usuario[input.id] = input.value;
  }

  localStorage.setItem("user", JSON.stringify(usuario));
}

function validarInputs(e) {
  const inputIds = ["nombre", "apellido", "email"];
  let contador = 0;

  for (const id of inputIds) {
    const input = document.getElementById(id);

    if (!input.checkValidity()) {
      input.classList.remove("is-valid");
      input.classList.add("is-invalid");
    } else {
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
    }

    if (input.classList.contains("is-invalid")) {
      contador += 1;
    }
  }

  if (contador != 0) {
    e.preventDefault();
    e.stopPropagation();
  } else {
    guardarEnLocalStorage();
    this.location.href = "./my-profile.html";
  }
}

function establecerSrcImagen(idElemento) {
  const contenedorImagen = document.getElementById(idElemento);
  if (localStorage.getItem("foto-perfil") != undefined) {
    contenedorImagen.src = localStorage.getItem("foto-perfil");
  }
}

function cargarImagen() {
  const inputImagen = document.getElementById("imagen");

  inputImagen.addEventListener("change", (e) => {
    const lectorArchivo = new FileReader();

    lectorArchivo.readAsDataURL(e.target.files[0]);

    lectorArchivo.addEventListener("load", () => {
      localStorage.setItem("foto-perfil", lectorArchivo.result);

      establecerSrcImagen("foto_nav_bar");
      establecerSrcImagen("foto_perfil");
    });
  });
}
document.addEventListener("DOMContentLoaded", () => {
  cargarImagen();

  establecerSrcImagen("foto_nav_bar");
  establecerSrcImagen("foto_perfil");

  mostrarTodosLosDatos();
  let btnGuardarDatos = document.getElementById("btnGuardar");
  btnGuardarDatos.addEventListener("click", (e) => {
    validarInputs(e);
  });
});
