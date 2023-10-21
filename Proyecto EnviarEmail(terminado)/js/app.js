const d=document;
d.addEventListener('DOMContentLoaded', function() {
  
const email={
  email: ' ',
  asunto: ' ',
  mensaje: ' '
}

console.log(email);

  //selccionar los elementos de la interfaz
  const inputEmail = d.querySelector("#email");
  const inputAsunto = d.querySelector("#asunto");
  const inputMensaje = d.querySelector("#mensaje");
  const formulario = d.querySelector("#formulario");
  const btnSubmit = d.querySelector('#formulario button[type="submit"]');
  const btnReset = d.querySelector('#formulario button[type="reset"]');
  const spinner = d.querySelector("#spinner")

  //asignar eventos
inputEmail.addEventListener("input",validar);
inputAsunto.addEventListener("input",validar);
inputMensaje.addEventListener("input",validar);
formulario.addEventListener("submit",enviarEmail);


btnReset.addEventListener("click",function(e){
        e.preventDefault();
        //reiniciar el objeto
        email.email ="";
        email.asunto ="";
        email.mensaje ="";
        formulario.reset();
        comprobarEmail();
})


function enviarEmail (e){
  e.preventDefault();
  spinner.classList.remove("hidden");

  setTimeout(() => {
spinner.classList.add("hidden");

resetFormulario()
//crear un alerta
const alertaExito = d.createElement("P");
          alertaExito.classList.add("bg-green-500","text-white","p-2","text-center","rounded-lg"
          ,"mt-10","font-bold","txt-sm","uooercase")
          alertaExito.textContent = "Mensaje enviado con exito"
formulario.appendChild(alertaExito);
            setTimeout(() => {
                alertaExito.remove();
            }, 1000);          
  }, 3000);
}




function validar(e){
//console.log(e.target.parentElement);
  if(e.target.value.trim() ===""){
      mostrarAlerta(`el campo ${e.target.id} es obligatorio`,e.target.parentElement);  
      email[e.target.name] = '';
      comprobarEmail();
      return;
    };
    if(e.target.id === "email" && !validarEmail(e.target.value)){
      mostrarAlerta("el Email no es valido",e.target.parentElement);
      email[e.target.name] = '';
      comprobarEmail();
      return;
    }
    limpiarAlerta(e.target.parentElement);

    //asignar los valores
    email[e.target.name]= e.target.value.trim().toLowerCase();


    //comprobar el objeto de email
    comprobarEmail()
};

function mostrarAlerta(mensaje,referencia){
limpiarAlerta(referencia);
  //generar alerta en html
  const error = d.createElement("P")
            error.textContent = mensaje;
            error.classList.add("bg-red-600","text-white","p-2","text-center")
//inyectar el error al formulario
referencia.appendChild(error);    
}

function limpiarAlerta(referencia) {
  // comprueba si ya existe una alerta
  const alerta= referencia.querySelector(".bg-red-600");
  if(alerta){
    alerta.remove()
  }
}

function validarEmail(email){
  const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ ;
  const resultado = regex.test(email);
  return resultado;
}

function comprobarEmail(){
  if(Object.values(email).includes('')){
      btnSubmit.classList.add('opacity-50');
      btnSubmit.disabled = true;
      return;
      }
      btnSubmit.classList.remove('opacity-50');
       btnSubmit.disabled = false;      
}

function resetFormulario(){
  //reiniciar el objeto
        email.email ="";
        email.asunto ="";
        email.mensaje ="";
        formulario.reset();
        comprobarEmail();
}
});