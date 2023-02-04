//config para el como oscuro y claro

let mode                        = localStorage.getItem('tema')
let body                        = document.getElementById('body')
let box                         = document.getElementById('box')

if(mode == 'dark'){

    body.style.background       = '#38393f'
    box.className               = 'box-dark'

}else{

    body.style.background       = '#fff'

}

let buttonReg                   = document.getElementById('buttonReg')
buttonReg.style.color           = '#5740ce'

let buttonLog                 = document.getElementById('buttonLog')

function RegRedirect() {
  
  let timerInterval

  Swal.fire({

    title: 'Direccionando',
    html: 'Espera... <b></b> milliseconds.',
    timer: 2000,
    timerProgressBar: true,

    didOpen: () => {

      Swal.showLoading()
      const b = Swal.getHtmlContainer().querySelector('b')
      timerInterval = setInterval(() => {

        b.textContent = Swal.getTimerLeft()

      }, 100)

    },

    willClose: () => {

      clearInterval(timerInterval)

    }

  }).then((result) => {

    if (result.dismiss === Swal.DismissReason.timer) {

      window.location.href = "/login"
      
    }

  })

}

buttonLog.addEventListener('click', RegRedirect)

let RedirectIni                 = document.getElementById('buttonIni')

function LogRedirect() {
  
  let timerInterval

  Swal.fire({

    title: 'Direccionando',
    html: 'Espera... <b></b> milliseconds.',
    timer: 2000,
    timerProgressBar: true,

    didOpen: () => {

      Swal.showLoading()
      const b = Swal.getHtmlContainer().querySelector('b')
      timerInterval = setInterval(() => {

        b.textContent = Swal.getTimerLeft()

      }, 100)

    },

    willClose: () => {

      clearInterval(timerInterval)

    }

  }).then((result) => {

    if (result.dismiss === Swal.DismissReason.timer) {

      window.location.href = "/"
      
    }

  })

}

RedirectIni.addEventListener('click', LogRedirect)