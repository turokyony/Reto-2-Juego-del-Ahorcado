//Este codigo fue inspirado en el de mi comanero,Gracias a el este juego es posible//
//Definir variables
let vidas = 6;
let flag = false;

//configuracion inicial.
const ocultarAgregarPalabra = document.querySelector(".main__agregarPalabra").style.display="none";
const ocultarBotones = document.getElementById("botonesMenuP");
//divMensaje.innerHTML.
const btnAgregarPalabra = document.querySelector(".btnAgregarPalabra");

const btnIniciarJuego = document.querySelector(".btnIniciarJuego");
//Reset valores preestablecidos
const mensaje = document.querySelector(".mensaje");
mensaje.innerHTML="";

const btnNuevoJuego = document.querySelector(".btnNuevoJuego");
const btnDesistir= document.querySelector(".btnDesistir");

//colocar base del mastil de la horca.
const dibujAhorcado = document.getElementById("hombre");
dibujAhorcado.src= "imagenes/0" + vidas + ".png";

let template=document.querySelector(".letrasCorrectas");
template.innerHTML = "";

let temp=document.querySelector(".letrasErradas");
temp.innerHTML = "";
/* ****************************** */

//remover eventoEventListener
const terminarJuego=()=>{
 document.removeEventListener('keydown', letraPulsada);
};
/****************************************** */
//disminuir el numero de vidas establecidas.
//Dibujar el estado del ahorcado segun las vidas establecidas.
//generar mensaje de fin de juego, si vidas=0.
const restarVidas = ()=>{

vidas--; 

dibujAhorcado.src= "imagenes/0" + vidas + ".png";
if (vidas===0) {
   terminarJuego();
   mensaje.innerHTML="Fin del juego, la palabra era: " + palabraSel;
}
}

//dibujar letra que no pertenecen a la palabra a adivinar
const letraErrada = () =>{
template = document.querySelector(".letrasErradas");
template.innerHTML="";
for(let letra of palabrasIncorrectas){
   let span = document.createElement("span");
   let txt = document.createTextNode(letra);   

   span.setAttribute('class','letra errada');
   span.appendChild(txt);
   template.appendChild(span);
}
}

//La letra correcta se imprime en pantalla en la posicion correspondiente.
const letraCorrecta = ()=>{
const palabra = palabraSeleccionada;

let template=document.querySelector(".letrasCorrectas");
template.innerHTML="";
palabrasAcertadas = 0;
for(let letra of palabra){
   let span = document.createElement("span");
   let txt = document.createTextNode("");   
   if(palabrasCorrectas.indexOf(letra)>=0)   {
       txt.nodeValue=letra;  
       palabrasAcertadas++;
   } 
   span.setAttribute('class','letra adivinada');
   span.appendChild(txt);
   template.appendChild(span);
}

if(palabrasAcertadas === palabra.length) {
   mensaje.innerHTML="Ganaste, felicidades!";
   terminarJuego();
} 
}

//determinar si la letra pertenece o no a la palabra a adivinar.
//si es correcta, se ingresa al arreglo de letras digitadas y tambien al de palabras correctas
const letrasIngresadas = letra => {
if(palabraSeleccionada.includes(letra)) {
   palabrasCorrectas.push(letra);
   letraCorrecta();
} else {
   palabrasIncorrectas.push(letra);
   restarVidas();
   letraErrada();
}
arregloLetraDigitada.push(letra);//permite almacenar y verificar todas las letras digitadas
};

//Detectar la letra pulsada por teclado
const letraPulsada = event => {
let letraDigitada = event.key.toUpperCase();
   if(letraDigitada.match(/^[a-z]$/i) && !arregloLetraDigitada.includes(letraDigitada) ) {    
       letrasIngresadas(letraDigitada);
   }
}

//Selecciona aleatoriamente, una palabra de la base de palabras prestablecidas.
const selectAleatorioPalabra = () => {
let palabra = arregloPalabras[Math.floor((Math.random() * arregloPalabras.length))].toUpperCase();
palabraSel=palabra;
palabraSeleccionada = palabra.split('');
}

//iniciar variables para nuevo juego
const nuevoJuego = () => {
//Definir variables
palabraSeleccionada="";
vidas = 6;
letraDigitada="";
palabrasAcertadas= 0;
palabrasCorrectas=[];
palabrasIncorrectas=[];
arregloLetraDigitada=[];
palabraSel="";

ocultarBotones.style.display="none";

//ocultar elemetos del tablero    
document.getElementById("hombreAhorcado").style.display="";
document.querySelector(".letrasCorrectas").style.display="";
document.querySelector(".letrasErradas").style.display="";
document.querySelector(".botones").style.display="";
//reset
dibujAhorcado.src= "imagenes/0" + vidas + ".png";
mensaje.innerHTML="";//limpiar mensaje gana o pierde

let temp=document.querySelector(".letrasErradas");
temp.innerHTML = "";

if(flag){
   let palabra =arregloPalabras[arregloPalabras.length-1];
   palabraSel=palabra;
   //palabraSeleccionada = palabra.split('');
   palabraSeleccionada = palabra.split('');
   flag = false;
}
else {
   selectAleatorioPalabra();
}    

letraCorrecta("");  

document.addEventListener('keydown', letraPulsada);
}


const desistir = ()=>{
//regresar al menu anterior
ocultarBotones.style.display="";

//ocultar elemetos del tablero    
mensaje.innerHTML="";
document.getElementById("hombreAhorcado").style.display="none";
document.querySelector(".letrasCorrectas").style.display="none";
document.querySelector(".letrasErradas").style.display="none";
document.querySelector(".botones").style.display="none";
}

//iniciar vista para agregarPalabra
const mostrarMenuPalabra = ()=>{
ocultarAgregarPalabras.style.display="";
document.getElementById("agregarPalabra").value="";

//ocultar menu principal
document.getElementById("botonesMenuP").style.display="none";
}

//uso de la funcion desistir
desistir();

//escucha de eventos
btnNuevoJuego.addEventListener('click', nuevoJuego);
btnDesistir.addEventListener('click', desistir);
btnIniciarJuego.addEventListener('click', nuevoJuego);
btnAgregarPalabra.addEventListener('click',mostrarMenuPalabra);