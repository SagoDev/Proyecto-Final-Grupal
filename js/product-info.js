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
        <div>
            <h1>${info.name}</h1>
        </div>
        <div>
            <p>Precio: ${info.currency} ${info.cost}</p>
        </div>
        <div>
            <p>Descripcion: ${info.description}</p>
        </div>
        <div>
            <p>Categoria: ${info.category}</p>
        </div>
        <div>
            <p>Cantidad de vendidos: ${info.soldCount}</p>
        </div>

        
    `
    for(let image of info.images){
        contenedor.innerHTML += `
        <div>
            <img src=${image}>
        </div>
        
        `
    }
}








document.addEventListener('DOMContentLoaded', () =>{
    traerInfo();
})