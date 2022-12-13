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

function darkmode() {

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

  singinup.className            = 'registro-inicio'
  bar.style.background          = '#212529'
  background.style.background   = '#fff'
  background.className          = 'dark'
  apagado.style.display         = 'none'
  encendido.style.display       = 'block'

}

apagado.addEventListener('click',lightmode)