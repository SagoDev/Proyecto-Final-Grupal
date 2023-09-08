function setDataStorage(email,pass){
    
    localStorage.setItem("user", JSON.stringify({ 'mail':email, 'pass': pass }));
    this.location.href = "./index.html";
}

function isValid(){

}


document.addEventListener("DOMContentLoaded", ()=>{
    let inputForm = document.getElementById('logIn');
    
    inputForm.addEventListener('keyup',(e)=>{
        let input = e.target;
        if(input.classList.contains('form-control')){
        
            if(input.value === ""){
                input.classList.remove('is-valid');
                input.classList.remove('is-invalid');
            }
            else if (!input.value.isValid()) {
                input.classList.remove('is-valid');
                input.classList.add('is-invalid');
            } 
            else if (input.value.isValid()) {
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
            }            
    }
    });
    inputForm.addEventListener('click',(e)=>{
    
        let emailValue = document.getElementById('email').value;
        let passwordValue = document.getElementById('pass').value;

        if(e.target.classList.contains('logIn')){
            if (!inputForm.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
                logIn.classList.add('was-validated')                
            }
            else{            
                setDataStorage(emailValue,passwordValue);
            };                               
        }
    });        
});