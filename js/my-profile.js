document.addEventListener('DOMContentLoaded', () =>{
    traerDatos("email")
})


/* Funcion universal para mostrar los datos guardados del local storage. 
Tiene que conicidir el id input con atributo del objeto user en el local Storage... */

function traerDatos(campo){
    let user = JSON.parse(localStorage.getItem('user'))
    let userCampo = user[campo]
    console.log(user[campo])


    let inputValue = document.getElementById(campo)
    inputValue.value = userCampo
}