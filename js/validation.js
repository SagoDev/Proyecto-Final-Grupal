const LOGIN_URL = "http://localhost:3000/login/";

// Parámetros para validar email y contraseña
let expresiones = {
    email: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
    password: /^.{6,}$/
};

// Guarda los datos del input en el Local storage
function guardarInfoEnLocal(email, contra) {

    localStorage.setItem("user", JSON.stringify({ 'email': email.value, 'pass': contra.value }));
    this.location.href = "./index.html";
}

// Valida email y contraseña
//   Dispara alerta si algún dato no es válido
//   Ejecuta función que guarda los datos del input en el Local storage si son válidos
function validarInfo(email, contraseña, e) {
    if (email.value === "" || contraseña.value === "" || email.classList.contains('is-invalid') || contraseña.classList.contains('is-invalid')) {
        e.preventDefault();
        e.stopPropagation();
        Swal.fire({
            icon: 'error',
            title: 'Debes introducir datos válidos',
            confirmButtonColor: '#0d6efd'
        });
    } else {
        guardarInfoEnLocal(email, contraseña);
    }
}


// Agrega clases para bootstrap por si es válido o no es válido
// Quita clases para bootstrap por si es válido o no es válido
function validarOInvalidar(input) {

    if (input.value === "") {
        input.classList.remove('is-valid');
        input.classList.remove('is-invalid');
    }
    else if (!expresiones[input.type].test(input.value)) {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
    }
    else if (expresiones[input.type].test(input.value)) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    }
}


async function login() {
    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;
    try {
        const response = await fetch(LOGIN_URL, {
            method: "POST",
            headers:
                { "Content-Type": "application/json", },
            body: JSON.stringify({ email, pass }),
        });
        if (!response.ok) {
            alert("Usuario y/o contraseña incorrectos");
            return false;
        }
        const data = await response.json();
        const token = data.token;
        console.log(token)
        console.log(data)
        localStorage.setItem("token", token);
    } catch (error) { alert("Error logeando")
    console.log(error)        
}
}






// Cuando se carga la página
//   Lee y manipula los input
document.addEventListener("DOMContentLoaded", async () => {
    let form = document.getElementById('logIn');
    let inputEmail = document.getElementById('email');
    let inputContraseña = document.getElementById('pass');
    let btnLogin = document.getElementById('login');

    // Escucha las teclas para darle clases para Bootstrap
    // Escucha la tecla Enter para validar los datos
    form.addEventListener('keyup', (e) => {
        let input = e.target;
        if (input.classList.contains('form-control')) {
            if (e.keyCode === 13) {
                validarInfo(inputEmail, inputContraseña, e);
            }
            validarOInvalidar(input);
        }
    });
    // Escucha el click del botón de login para validar datos
    btnLogin.addEventListener('click', async (e) => {
        await login()
        validarInfo(inputEmail, inputContraseña, e);
    });
});