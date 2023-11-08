/* Funcion universal para mostrar los datos guardados del local storage. 
Tiene que conicidir el id input con atributo del objeto user en el local Storage... */

function traerDatos(campo) {
    let usuario = JSON.parse(localStorage.getItem('user'))
    let usuarioCampo = usuario[campo]


    let inputValue = document.getElementById(campo)
    inputValue.value = usuarioCampo
};

function guardarEnLocalStorage() {
    let usuario = JSON.parse(localStorage.getItem('user'))
    let listaInputs = document.getElementsByClassName('form-control');

    for (const input of listaInputs) {
        usuario[input.id] = input.value;
    }

    localStorage.setItem('user', JSON.stringify(usuario));
};

function validarInputs(e) {
    const inputIds = ["nombre", "apellido", "email"];
    let contador = 0;
    inputIds.forEach((id) => {
        const input = document.getElementById(id);

        if (!input.checkValidity()) {
            input.classList.remove("is-valid");
            input.classList.add("is-invalid");
        } else {
            input.classList.remove("is-invalid");
            input.classList.add("is-valid");
        }
    });

    inputIds.forEach((id) => {
        const input = document.getElementById(id);
        if (input.classList.contains('is-invalid')) {
            contador += 1;
        }
    });

    if(contador!= 0){
        e.preventDefault();
        e.stopPropagation();
    }else{
        guardarEnLocalStorage();
        this.location.href = "./my-profile.html"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    traerDatos("email");
    let btnGuardarDatos = document.getElementById('btnGuardar');
    btnGuardarDatos.addEventListener('click', (e) => {
        validarInputs(e);
    });
});