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

let buttonLog                   = document.getElementById('buttonLog')
buttonLog.style.color           = '#5740ce'

let buttonReg                 = document.getElementById('buttonReg')

function RegRedirect() {
  
  let timerInterval

  Swal.fire({

    title: 'Auto close alert!',
    html: 'I will close in <b></b> milliseconds.',
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

      window.location.href = "/views/registro.html"
      
    }

  })

}

buttonReg.addEventListener('click', RegRedirect)

let RedirectIni                 = document.getElementById('buttonIni')

function LogRedirect() {
  
  let timerInterval

  Swal.fire({

    title: 'Auto close alert!',
    html: 'I will close in <b></b> milliseconds.',
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

      window.location.href = "/views/inicio.html"
      
    }

  })

}

RedirectIni.addEventListener('click', LogRedirect)