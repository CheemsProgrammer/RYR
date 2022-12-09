let button = document.getElementById('button')

function sweetalert() {

    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'pareceque tu papá no está definido!',
        footer: 'quiere encontrarlo?'
      })

}

button.addEventListener('click', sweetalert)