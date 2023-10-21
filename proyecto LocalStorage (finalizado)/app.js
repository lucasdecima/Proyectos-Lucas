// variables
const d = document;
const formulario = d.querySelector('#formulario');
const listaTweets = d.querySelector('#lista-tweets');
let tweets = [];



//eventlisteners
eventlisteners();

function eventlisteners(){
    //cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);
    //cuando el documento esta listo
    d.addEventListener("DOMContentLoaded",()=>{
        tweets = JSON.parse(localStorage.getItem('tweets') || [])
        crearHTML();
    })
};

//funciones

function agregarTweet(e) {
    e.preventDefault();

    // textarea donde el usuario escribe
    const tweet = d.querySelector("#tweet").value;
    console.log(tweet);
    //validacion....
    if(tweet === ""){
        mostrarError('este campo no puede ir vacio');
        return; // evita quese ejecuten mas lineas de codigo
    }


    const tweetObj = {
        id: Date.now(),
        tweet
    }
    //aniadir al arreglo de tweets
    tweets = [...tweets,tweetObj];
    console.log(tweets);

    // una vez agregado vamos a crear el html
    crearHTML();

    // reiniciar el formulario
    formulario.reset();
};


// mostrar mensaje de error
function mostrarError(error) {
    const mensajeError = d.createElement('p');
          mensajeError.textContent =  error;
          mensajeError.classList.add("error");
    // insertar el contenido
    const contenido = d.querySelector('#contenido');
          contenido.appendChild(mensajeError);
    // elimina la alerta despues de 3 segundos      
    setTimeout(() => {
        mensajeError.remove()
    }, 3000);      
};

// muestra un listado de los tweets
function crearHTML() {
    limpiarHTML();

    if(tweets.length > 0){
        tweets.forEach(tweet =>{
            //agregar un boton de eliminar
            const btnEliminar = d.createElement("a");
                  btnEliminar.classList.add('borrar-tweet');
                  btnEliminar.innerHTML = 'x'
            // aniadir la funcion de eliminar
            btnEliminar.onclick = ()=>{
                borrarTweet(tweet.id);
            }      
            //crear el html
            const li = d.createElement("li");
                  // aniadir al texto  
                  li.innerHTML = tweet.tweet
                  //insertar el boton
                  li.appendChild(btnEliminar);  
                  // insertar al html
                  listaTweets.appendChild(li)
        })

    }
    sintonizarStorage();
};

//agrega los tweets actuales al localStorage
function sintonizarStorage() {
    localStorage.setItem('tweets',JSON.stringify(tweets));
};

// elimina un tweet
function borrarTweet(id) {
    //console.log('borrando',id);
    tweets = tweets.filter(tweet => tweet.id !== id);
    //console.log(tweets);
    crearHTML()
}




// limpiar el html
function limpiarHTML() {
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
};