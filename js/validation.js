document.addEventListener("DOMContentLoaded", ()=>{
    
    logIn.addEventListener('keyup',(e)=>{
    if(e.target.classList.contains('form-control')){
        
        if(e.target.value === ""){
            e.target.classList.remove('is-valid');
            e.target.classList.remove('is-invalid');
        }
        else if (!e.target.checkValidity()) {
            e.target.classList.remove('is-valid');
            e.target.classList.add('is-invalid');
        } 
        else if (e.target.checkValidity()) {
            e.target.classList.remove('is-invalid');
            e.target.classList.add('is-valid');
        }            
    }
    });
    logIn.addEventListener('click',(e)=>{
    if(e.target.classList.contains('logIn')){
        if (!logIn.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
            logIn.classList.add('was-validated')                
        }
        else{
        }
        ;                                
    }
    });        
});