const api = 'https://japceibal.github.io/emercado-api/products/'
let id = localStorage.getItem('ProductID');
let apiProduct = api + id + '.json'


// Trae la información del producto de la API
function traerInfo(){
    fetch(apiProduct)
        .then(Response => Response.json())
        .then(data => {
            mostrarInfo(data)
        })
}

// Muestra la información y las Imágenes del producto en el HTML
function mostrarInfo(info){
    let contenedor = document.getElementById('contenedor-producto');
    let contenedorImagenes = document.getElementById('contenedor-imagenes')
    
    // Muestra la información del producto
    contenedor.innerHTML = `
        <div class='mt-5'>
            <h1 class='pt-2'>${info.name}</h1>
            <hr>
        </div>
        <div>
            <p> <b>Precio:</b> <br> ${info.currency} ${info.cost}</p>
        </div>
        <div>
            <p> <b>Descripcion: </b> <br> ${info.description}</p>
        </div>
        <div>
            <p> <b> Categoria: </b> <br> ${info.category}</p>
        </div>
        <div>
            <p> <b> Cantidad de vendidos: </b> <br> ${info.soldCount}</p>
        </div>
        <div>
            <p> <b>Imagenes ilustrativas: </b></p>
        </div>
            
        
    `
    // Muestra las imágenes del producto
    for(let image of info.images){
        contenedorImagenes.innerHTML += `
        <div class='col-3 align-item-center'>
            <div class='contenedor-imagen-info'>
                <img class='imagen-info' src=${image}>
            </div>
                
        </div>
        
        `
    }
}







// Ejecuta todo el código cuando se carga la página
document.addEventListener('DOMContentLoaded', () =>{
    traerInfo();
})