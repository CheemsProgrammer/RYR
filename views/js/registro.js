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