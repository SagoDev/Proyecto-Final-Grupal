// Parámetros para validar email y contraseña
let expresiones = {
    email: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
    password: /^.{6,}$/

};

// Guarda los datos del input en el Local storage
function setDataStorage(email,pass){
    
    localStorage.setItem("user", JSON.stringify({ 'email':email.value, 'pass': pass.value }));
    this.location.href = "./index.html";
}

// Valida email y contraseña
//   Dispara alerta si algún dato no es válido
//   Ejecuta función que guarda los datos del input en el Local storage si son válidos
function validData(email,password,e){
    if(email.value === "" || password.value === "" || email.classList.contains('is-invalid') || password.classList.contains('is-invalid')){
        e.preventDefault();
        e.stopPropagation();
        Swal.fire({
            icon: 'error',
            title: 'Debes introducir datos válidos',
            confirmButtonColor: '#0d6efd'});                
    } else {            
        setDataStorage(email,password);
    }
}


// Agrega clases para bootstrap por si es válido o no es válido
// Quita clases para bootstrap por si es válido o no es válido
function addValidOrInvalidClass(input){    
    
    if(input.value === ""){
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

// Lee y manipula los input
document.addEventListener("DOMContentLoaded", ()=>{
    let form = document.getElementById('logIn');
    let inputEmail = document.getElementById('email');
    let inputPassword = document.getElementById('pass');
    let btnLogin = document.getElementById('login');

    // Escucha las teclas para darle clases para Bootstrap
    // Escucha la tecla Enter para validar los datos
    form.addEventListener('keyup',(e)=>{
        let input = e.target;
        if(input.classList.contains('form-control')){
            if(e.keyCode===13){
                validData(inputEmail,inputPassword,e);
            }
            addValidOrInvalidClass(input);
        }
    });    
    
    // Escucha el click del botón de login para validar datos
    btnLogin.addEventListener('click',(e)=>{        
        validData(inputEmail,inputPassword,e);
    });    
});