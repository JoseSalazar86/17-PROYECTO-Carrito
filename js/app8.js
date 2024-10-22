//creamos las variables

let articulosCarrito = [];
const carrito = document.querySelector("#lista-carrito tbody");
const vaciarCarrito = document.querySelector("#vaciar-carrito");

document.addEventListener('DOMContentLoaded', cargarEventListeners);

function cargarEventListeners() {

    document.querySelector("#lista-cursos").addEventListener("click", agregarCurso);

    carrito.addEventListener("click", eliminarCurso);

    vaciarCarrito.addEventListener("click", () =>{
        articulosCarrito = [];
        limpiarHtml();
        carritoPintar();
        });
}
function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains("agregar-carrito")){
        const curso = e.target.parentElement.parentElement;
        cursoDatos(curso);
    }
}
function eliminarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains("borrar-curso")){
        const cursoId = e.target.getAttribute("data-id");
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        carritoPintar();
    }
}
//funcion donde leemos los datos del curso
function cursoDatos(curso){
    const informacionCurso = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1
    };

    const existeCurso = articulosCarrito.find(curso => curso.id === informacionCurso.id);
    if (existeCurso) {
        existeCurso.cantidad++;
    }else {
        articulosCarrito = [...articulosCarrito,informacionCurso];
    }

    carritoPintar();
}
//funcion para que el curso aparezca pintado o mostrado dentro del carrito
function carritoPintar(){
    limpiarHtml();
    let html = articulosCarrito.map(curso => {
        const{imagen,titulo,precio,cantidad,id} = curso;
        return `
        <tr>
        <td><img src="${imagen}" width="100"></td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td><a href="#" class="borrar-curso" data-id="${id}">X</a> </td>
        </tr>`;
    }).join('');
    carrito.innerHTML = html;
}

function limpiarHtml(){
    while(carrito.firstChild){
        carrito.removeChild(carrito.firstChild);
    }
}