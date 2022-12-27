let body                    = document.getElementById('body')

if(localStorage.getItem('tema') == 'dark'){

    body.style.background   = '#16171b'

}

Swal.fire({

    title                   : 'Parece que hubo un error',
    text                    : 'Verifique que su contraseña y correo sigan las instrucciones(mas de 8 digitos, y estructura correcta de su correo)',
    confirmButtonText       : 'Regresar',

  }).then((result) => {

    if (result.isConfirmed) {

        Swal.fire({

            title           : 'Redireccionando',
            html            : 'Espere unos <b></b> milliseconds.',
            timer           : 2000,
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

})