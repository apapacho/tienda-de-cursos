//variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    // Cuando agregas un curso presionando "Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso);

    // Eliminar cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; //reseteamos el arreglo

        limpiarHTML(); //eliminamos todo el html
    })
}

//Funciones
function agregarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCurso(cursoSeleccionado);
    }

}
// Elimina un curso del carrito
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

    //Elimina del arreglo de articulosCarrito por data-id
    articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
    carritoHTML(); // iterar sobre el carrito y mostrar su HTML

}
}

//Lee el contenido del html al que le dimos click y extrae la info del curso
function leerDatosCurso(curso) {
    //console.log(curso);

    //Crear un objeto con el curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id ===infoCurso.id)
    if(existe){
        //actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if(curso.id ===infoCurso.id){
                curso.cantidad++;
                return curso; //retorna el objeto actualizado
            }else{
                return curso; //retorna los objetos que no son los duplicados
            }
        });
        articulosCarrito = [...cursos];
    }else{ 

    // Agregar elementos al arreglo del carrito 
    articulosCarrito = [...articulosCarrito, infoCurso];
}
    console.log(articulosCarrito);

    carritoHTML();
}

//Muestra el Carrito de compras en el HTML
function carritoHTML() {
    //limpiar el html
    limpiarHTML();

    articulosCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td><img src="${imagen}"></td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td><a href="#" class="borrar-curso" data-id="${id}">X</a></td>
        `;

        // Agrega el html del carritoen el tbody
        contenedorCarrito.appendChild(row);
        
    })
}

// Elimina los cursos del tbody
function limpiarHTML(){
  //forma lenta de limpiar un html -NO se usa
    //contenedorCarrito.innerHTML = '';

    //forma rápida de limpiar un HTML
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }

}