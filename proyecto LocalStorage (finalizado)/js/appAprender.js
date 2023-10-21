//------------------agregando informacion---------

localStorage.setItem('nombre','lucas');
sessionStorage.setItem('nombre','vicky');

//pasando objetos a string
const producto = {
    nombre: 'Monitor 27 Pulgadas',
    precio: 300
};

const productoString = JSON.stringify(producto);
//console.log(productoString);
localStorage.setItem('producto', productoString);

//pasando arreglos a string
const meses = ['enero','febrero','diciembre'];
const mesesString = JSON.stringify(meses);
localStorage.setItem('meses',mesesString);


//-----------obteniendo informacion--------------

const nombre = localStorage.getItem('nombre');
//console.log(nombre);

const productoJson = localStorage.getItem("producto");
//console.log(productoJson);
//console.log(JSON.parse(productoJson));//pasamos de string a objeto

const mesesw = localStorage.getItem('meses');
//console.log(mesesw);
//console.log(JSON.parse(mesesw));

//------------eliminando elementos------------
localStorage.removeItem('nombre'); 

//----- actualizar registro

const mesesArray = JSON.parse(localStorage.getItem('meses'));
console.log(mesesArray);
mesesArray.push('nuevo mes');
console.log(mesesArray);
localStorage.setItem('meses', JSON.stringify(mesesArray));