let expresiones = {
    email: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
    password: /^.{6,}$/

};

function setDataStorage(email,pass){
    
    localStorage.setItem("user", JSON.stringify({ 'email':email.value, 'pass': pass.value }));
    this.location.href = "./index.html";
}

function validData(email,password,e){
    if(email.value === "" || password.value === "" || email.classList.contains('is-invalid') || password.classList.contains('is-invalid')){
        e.preventDefault();
        e.stopPropagation();
        Swal.fire({
            icon: 'error',
            title: 'Debes introducir datos válidos'});                
    } else {            
        setDataStorage(email,password);
    }
}

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


document.addEventListener("DOMContentLoaded", ()=>{
    let form = document.getElementById('logIn');
    let inputEmail = document.getElementById('email');
    let inputPassword = document.getElementById('pass');
    let btnLogin = document.getElementById('login');

    form.addEventListener('keyup',(e)=>{
        let input = e.target;
        if(input.classList.contains('form-control')){
            if(e.keyCode===13){
                validData(inputEmail,inputPassword,e);
            }
            addValidOrInvalidClass(input);
        }
    });    
    btnLogin.addEventListener('click',(e)=>{        
        validData(inputEmail,inputPassword,e);
    });    
});