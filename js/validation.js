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
    
    inputForm.addEventListener('keyup',(e)=>{
        let input = e.target;
        if(input.classList.contains('form-control')){
            isValid(input);
        }
    });
    inputForm.addEventListener('click',(e)=>{
    
        let emailValue = document.getElementById('email');
        let passwordValue = document.getElementById('pass');

        if(e.target.classList.contains('logIn')){
            if (!inputForm.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
                logIn.classList.add('was-validated')                
            }
            else{
                isValid(emailValue);
                isValid(passwordValue)
                setDataStorage(emailValue,passwordValue);
            };                               
        }
    });        
});