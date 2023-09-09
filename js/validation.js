let expresiones = {
    email: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
    password: /^.{6,}$/
};

function setDataStorage(email,pass){
    
    localStorage.setItem("user", JSON.stringify({ 'email':email.value, 'pass': pass.value }));
    this.location.href = "./index.html";
}

function isValid(input){    
    
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
    let inputForm = document.getElementById('logIn');
    let email = document.getElementById('email');
    let password = document.getElementById('pass');
    let btnLogin = document.getElementById('login');

    inputForm.addEventListener('keyup',(e)=>{
        let input = e.target;
        if(input.classList.contains('form-control')){
            isValid(input);
        }
    });
    btnLogin.addEventListener('click',(e)=>{
        
        if(email.value === "" || password.value === ""){
            e.preventDefault();
            e.stopPropagation(); 
            Swal.fire({
                icon: 'error',
                title: 'Debes introducir tus datos!'});            

            isValid(email);
            isValid(password);
        } else {
            setDataStorage(email,password);
        }        
    });        
});