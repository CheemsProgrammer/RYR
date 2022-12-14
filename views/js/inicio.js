//Swal

let backgroundGradient       = 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(219,219,219,1) 50%, rgba(218,218,218,1) 100%)'

//esta alerta para cuando visitemos el inicio
Swal.fire({

  imageUrl            : '../views/image/cooking.svg',
  imageWidth          : 200,
  imageHeight         : 200,
  title               : 'Bienvenido/a repostero/a',
  background          : backgroundGradient

}).then(() =>{

//cookies

if(localStorage.getItem('cookies') == ''){

  const swalWithBootstrapButtons = Swal.mixin({



  })
  
  swalWithBootstrapButtons.fire({
  
    imageUrl            : '../views/image/cookies.png',
    imageWidth          : 50,
    imageHeight         : 50,
    width               : 400,
    heigth              : 300,
    text                : "Te dejo unas galletas para que disfreutes mientras exploras :D",
    showCancelButton    : true,
    confirmButtonText   : 'Aceptar',
    cancelButtonText    : 'Cancelar',
    position            : 'bottom-end'
  
  }).then((result) => {
  
      if (result.isConfirmed) {
  
        const Toast = Swal.mixin({
    
          toast           : true,
          position        : 'top-end',
          showConfirmButton: false,
          timer           : 2000,
          timerProgressBar: true,
    
        })
        
        Toast.fire({
    
          icon: 'success',
          title: 'Gracias y que las disfrutes!!'
    
        })
    
        localStorage.setItem('cookies','cook')
    
      } else if (
    
        result.dismiss === Swal.DismissReason.cancel
    
      ) {
    
        const Toast = Swal.mixin({
    
          toast           : true,
          position        : 'top-end',
          showConfirmButton: false,
          timer           : 2000,
          timerProgressBar: true,
    
        })
        
        Toast.fire({
    
          icon: 'error',
          title: 'Te lo pierdes >:(',
    
        })
    
      }
  
  })

}else{

  console.log('cookies complet')

}

})



//esta alerta para el boton de comienzo, que solo da una pequeña informacion para empezar
let infoInit                    = document.getElementById('infoInit')

function infoComienzo() {

  Swal.fire({

    imageWidth          : 200,
    imageHeight         : 200,
    imageUrl            : '../views/image/comunicacion.svg',
    title               : '<h1>Bienvenido a <span class="titleSweet">DeliciousPastries</span></h1>',
    text                : 'Pagina de donde encontraras todo lo necesario para tu reposteria!! registrate para pertenecer a esta gran experiencia',
    background          : backgroundGradient

  })

}

infoInit.addEventListener('click', infoComienzo)


//esto es para el boton de soporte
let informacion                 = document.getElementById('ayuda')

function helpText() {

  Swal.fire({

    imageWidth          : 200,
    imageHeight         : 200,
    imageUrl            : '../views/image/searching.svg',
    title               : '<h1>¿Buscas <span class="titleSweet">Ayuda?</span></h1>',
    text                : 'Envia un correo a  y resolveremos tu problema',
    background          : backgroundGradient

  })

}

informacion.addEventListener('click', helpText)

//esto abre la barra de iconos

const buttonbar                 = document.getElementById('buttonbar')
const bar                       = document.getElementById('barItem')

function actionBar(){

  bar.className = 'baropenicon'

}

buttonbar.addEventListener('click', actionBar)

//esto cierra la barra

const buttonclose               = document.getElementById('buttonclose')

function actionBarclose(){

  bar.className = 'barclose'

}

buttonclose.addEventListener('click', actionBarclose)

//funcion para el modo oscuro

let encendido                   = document.getElementById('encendido')
let apagado                     = document.getElementById('apagado')
let background                  = document.getElementById('dark')
let singinup                    = document.getElementById('registro-inicio-id')
let container                   = document.getElementById('container')

function darkmode() {

  localStorage.setItem("tema", "dark");
  container.className           = 'presentacion-dark'
  singinup.className            = 'registro-inicio-dark'
  bar.style.background          = '#fff'
  background.style.background   = '#212529'
  background.className          = 'icons'
  apagado.style.display         = 'block'
  encendido.style.display       = 'none'

}

encendido.addEventListener('click',darkmode)

//funcion para el modo claro 

function lightmode() {

  localStorage.removeItem('tema')
  localStorage.setItem("tema", "ligth");
  container.className           = 'presentacion'
  singinup.className            = 'registro-inicio'
  bar.style.background          = '#212529'
  background.style.background   = '#fff'
  background.className          = 'dark'
  apagado.style.display         = 'none'
  encendido.style.display       = 'block'

}

apagado.addEventListener('click',lightmode)

//esto lo utilizamos para que el tema quede guardado y no cambie al actualizar la pagina

let mode                        = localStorage.getItem('tema')

if(mode=='dark') {

  container.className           = 'presentacion-dark'
  singinup.className            = 'registro-inicio-dark'
  bar.style.background          = '#fff'
  background.style.background   = '#212529'
  background.className          = 'icons'
  apagado.style.display         = 'block'
  encendido.style.display       = 'none'

}else{

  container.className           = 'presentacion'
  singinup.className            = 'registro-inicio'
  bar.style.background          = '#212529'
  background.style.background   = '#fff'
  background.className          = 'dark'
  apagado.style.display         = 'none'
  encendido.style.display       = 'block'

}