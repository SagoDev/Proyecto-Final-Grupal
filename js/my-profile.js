/* Funcion universal para mostrar los datos guardados del local storage. 
Tiene que conicidir el id input con atributo del objeto user en el local Storage... */
let usuario = JSON.parse(localStorage.getItem('user'))

function traerDatos(campo) {

    let usuarioCampo = usuario[campo];
    let inputValue = document.getElementById(campo)
    inputValue.value = usuarioCampo;
};

function mostrarTodosLosDatos() {
    for (campo in usuario) {
        if (campo != 'pass') {
            traerDatos(campo);
        }
    }
}

function guardarEnLocalStorage() {
    let listaInputs = document.getElementsByClassName('form-control');

    for (const input of listaInputs) {
        if(input.id!='imagen'){
            usuario[input.id] = input.value;
        }
    }

    localStorage.setItem('user', JSON.stringify(usuario));
};

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

        if (input.classList.contains('is-invalid')) {
            contador += 1;
        }
    }

    if (contador != 0) {
        e.preventDefault();
        e.stopPropagation();
    } else {
        guardarEnLocalStorage();
        this.location.href = "./my-profile.html"
    }
};

function establecerSrcImagen(idElemento) {
    const contenedorImagen = document.getElementById(idElemento);
    if (localStorage.getItem("fotoPerfil") != undefined) {
        contenedorImagen.src = localStorage.getItem("fotoPerfil");
    }
}

function cargarImagen() {
    const inputImagen = document.getElementById("imagen");

    inputImagen.addEventListener("change", (e) => {
        const lectorArchivo = new FileReader();

        lectorArchivo.readAsDataURL(e.target.files[0]);

        lectorArchivo.addEventListener("load", () => {
            localStorage.setItem("fotoPerfil", lectorArchivo.result);

            establecerSrcImagen("foto_nav_bar");
            establecerSrcImagen("fotoPerfil");
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {

    cargarImagen();
    establecerSrcImagen("foto_nav_bar");
    establecerSrcImagen("fotoPerfil");
    mostrarTodosLosDatos()

    let btnGuardarDatos = document.getElementById('btnGuardar');
    btnGuardarDatos.addEventListener('click', (e) => {
        validarInputs(e);
    });
});