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

let encendido                   = document.getElementById('encendido')
let apagado                     = document.getElementById('apagado')
let background                  = document.getElementById('dark')
let singinup                    = document.getElementById('registro-inicio-id')

function darkmode() {

  singinup.className            = 'registro-inicio-dark'
  bar.style.background          = '#fff'
  background.style.background   = '#212529'
  apagado.style.display         = 'block'
  encendido.style.display       = 'none'

}

encendido.addEventListener('click',darkmode)

function lightmode() {

  singinup.className            = 'registro-inicio'
  bar.style.background          = '#212529'
  background.style.background   = '#fff'
  apagado.style.display         = 'none'
  encendido.style.display       = 'block'

}

apagado.addEventListener('click',lightmode)