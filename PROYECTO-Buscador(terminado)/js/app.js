
//variables
const d = document;
const marca = d.querySelector("#marca");
const year = d.querySelector("#year");
const minimo = d.querySelector("#minimo");
const maximo = d.querySelector("#maximo");
const puertas = d.querySelector("#puertas");
const transmision = d.querySelector("#transmision");
const color = d.querySelector("#color");

//contenedor para los resultados
const resultado = d.querySelector("#resultado");

const max = new Date().getFullYear();
const min = max-10;


//generar un objeto con la busqueda
const datosBusqueda = {
    marca:"",
    year:"",
    minimo:"",
    maximo:"",
    puertas:"",
    transmision:"",
    color:"",


}



// eventos
d.addEventListener("DOMContentLoaded", () =>{
    mostrarAutos(autos);//muestra los autos al cargar la pagina
    
    
    //llena las opciones de anios
    llenarSelect();

});


//event listener para los select de busqueda
marca.addEventListener('change',e =>{
    datosBusqueda.marca= e.target.value;
    filtrarAuto();
});
year.addEventListener('change',(e)=>{
    datosBusqueda.year= e.target.value;
    //console.log(datosBusqueda);
    filtrarAuto()
});
minimo.addEventListener('change',(e)=>{
    datosBusqueda.minimo= e.target.value;
   //console.log(datosBusqueda);
   filtrarAuto();
});
maximo.addEventListener('change',(e)=>{
    datosBusqueda.maximo= e.target.value;
    //console.log(datosBusqueda);
    filtrarAuto();
});
puertas.addEventListener('change',(e)=>{
    datosBusqueda.puertas= parseInt(e.target.value);
    //console.log(datosBusqueda);
    filtrarAuto();
});
transmision.addEventListener('change',(e)=>{
    datosBusqueda.transmision= e.target.value;
    //console.log(datosBusqueda);
    filtrarAuto();
});
color.addEventListener('change',(e)=>{
    datosBusqueda.color= e.target.value;
    //console.log(datosBusqueda);
    filtrarAuto();
});




//funciones
function mostrarAutos(autos){
    limpiarHTML()
    autos.forEach(auto =>{
        const autoHtml= d.createElement("p");
             autoHtml.textContent= `
                ${auto.marca}-${auto.modelo}-${auto.year}-${auto.puertas} puertas- transmision:${auto.transmision}- Precio:${auto.precio}- Color:${auto.color}
             `;
             //insertar en el html
             resultado.appendChild(autoHtml);
    })
};

//limpiar html
function limpiarHTML() {
      while (resultado.firstChild) {
              resultado.removeChild(resultado.firstChild);
      }
}
function llenarSelect(){
    for (let i = max; i >= min; i--) {
        const opciones = d.createElement("option");
              opciones.value = i ;
              opciones.textContent = i;
              year.appendChild(opciones); //agrega las opciones de anio al select
              
    }
    
};

//funcion que filtra en base a la busqueda
function filtrarAuto(){
    const resultado = autos.filter(filtarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor)
    console.log(resultado);
    if(resultado.length){
      mostrarAutos(resultado); 
    }else{
      limpiarHTML()
      noResultado();
    }
};

function noResultado() {
    const noResultado = document.createElement("div");
              noResultado.classList.add("alerta","error");
              noResultado.textContent = "no hay resultado, intenta con otros terminos de busqueda";
              resultado.appendChild(noResultado);
              
}

function filtarMarca(auto){
    const {marca} = datosBusqueda;
    if(marca){
        return auto.marca === marca;
    }
    return auto;
};

function filtrarYear(auto){
    const {year} = datosBusqueda;
    if(year){
        return auto.year === parseInt(year);
    }
    return auto;
};

function filtrarMinimo(auto) {
    const {minimo} = datosBusqueda;
    if (minimo) {
          return auto.precio >= minimo;
        }
        return auto;
};

function filtrarMaximo(auto) {
      const {maximo} = datosBusqueda;
      if (maximo) {
          return auto.precio <= maximo;
        }
        return auto;
};

function filtrarPuertas(auto) {
      const {puertas} = datosBusqueda;
      if (puertas) {
          return auto.puertas === puertas;
        }
        return auto;
};

function filtrarTransmision(auto) {
    const {transmision}= datosBusqueda;
    if(transmision){
      return auto.transmision == transmision
    };
    return auto;
};

function filtrarColor(auto) {
      const {color}= datosBusqueda;
    if(color){
      return auto.color == color
    }
    return auto;
}