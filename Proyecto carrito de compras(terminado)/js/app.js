//variables
const d = document;
const carrito = d.querySelector('#carrito');
const contenedorCarrito = d.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = d.querySelector("#vaciar-carrito");
const listaCursos = d.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
    //cuando agregas un curso presionando "agregar al carrito"
    listaCursos.addEventListener("click",agregarCurso);

    //elimina cursos del carrito
    carrito.addEventListener("click", eliminarCurso);

    // muestra los cursos del localStorage
    d.addEventListener("DOMContentLoaded", ()=>{
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoHTML();
    })

    //vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', ()=>{
        articulosCarrito=[];//reseteamos el arreglo
        limpiarHTML();// eliminamos todo el html
    })
};




//funciones
function agregarCurso(e){
    e.preventDefault()
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        
        leerDatosCurso(cursoSeleccionado);
    };    
};


//elimina un curso del carrito
function eliminarCurso(e){
    //console.log(e.target.classList);
    if(e.target.classList.contains('borrar-curso')){
        const cursoId= e.target.getAttribute('data-id');
        //elimina del arreglo de articuloscarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        carritoHTML();// volvemos a iterar sobre el carrito y mostrar su html
    }
}


//LEE EL CONTENIDO DEL HTML AL QUE LE DIMOS CLICK Y EXTRAE LA INFORMACION DEL CURSo
function leerDatosCurso(curso){
    //console.log(curso);

    //crear objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad:1
    }
    //revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    //console.log(existe);
    if(existe){
        //actua;lizamos la cantidad
        const cursos = articulosCarrito.map(curso =>{
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;// retorna los objetos actualizados 
            }else{
                return curso;// retorna los objetos que no son los duplicados
            }
        });
        articulosCarrito = [...cursos];
    }else{
        //agregamos el curso al carrito
        //agrega elementos al arreglo de acrrito
        articulosCarrito= [...articulosCarrito,infoCurso];
    }


    
    //console.log(articulosCarrito);

    carritoHTML();
};

//muestra el carrito de compras en el html
function carritoHTML(){


    //limpiar el html
    limpiarHTML();



    // recorre el carrito y genera el html
    articulosCarrito.forEach(curso =>{
        //console.log(curso);
        const row = document.createElement('tr');
              row.innerHTML = `
              <td>
                 <img src="${curso.imagen}" width="100%">
              </td>
              <td>
                ${curso.titulo},
              </td>
              <td>
                ${curso.precio},
              </td>
              <td>
                ${curso.cantidad},
              </td>
              <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}"> x </a>
              </td>
              `;
              //agrega el html del carrito en el tbody
              contenedorCarrito.appendChild(row);
    });

    // agregar el carrito al storage
    sincronizarStorage();
};

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito))
}

//eliminar los cursos del tbody
function limpiarHTML(){
    //forma lenta 
    //contenedorCarrito.innerHTML = '';

    //limpiar de forma rapida
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
};