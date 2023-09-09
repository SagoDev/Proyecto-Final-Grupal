const api = 'https://japceibal.github.io/emercado-api/products/'
let id = localStorage.getItem('ProductID');
let apiProduct = api + id + '.json'

function traerInfo(){
    fetch(apiProduct)
        .then(Response => Response.json())
        .then(data => {
            mostrarInfo(data)
        })
}


function mostrarInfo(info){
    let contenedor = document.getElementById('contenedor-producto');
    contenedor.innerHTML = `
        <h1>${info.name}</h1>
        <p>Precio: ${info.currency} ${info.cost}</p>
        <p>Descripcion: ${info.description}</>
        <p>Categoria: ${info.category}</p>
        <p>Cantidad de vendidos: ${info.soldCount}</p>
    `
    for(let image of info.images){
        contenedor.innerHTML += `
        <img src=${image}>
        `
    }
}








document.addEventListener('DOMContentLoaded', () =>{
    traerInfo();
})