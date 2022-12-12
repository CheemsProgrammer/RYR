//esto abre la barra de iconos

const buttonbar = document.getElementById('buttonbar')
const bar       = document.getElementById('barItem')

function actionBar(){

  bar.className = 'baropenicon'

}

buttonbar.addEventListener('click', actionBar)

//esto cierra la barra

const buttonclose = document.getElementById('buttonclose')

function actionBarclose(){

  bar.className = 'barclose'
  listitem.className = 'no'

}

buttonclose.addEventListener('click', actionBarclose)


