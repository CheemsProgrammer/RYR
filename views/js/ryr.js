var come        = document.getElementById('mas')
var menos       = document.getElementById('menos')
var NumberPage  = document.getElementById('NumberPage')
var slide       = 0;

come.addEventListener('click', () => {

    slide++;
    NumberPage.innerHTML = slide
    if(slide == 4){

        slide--;

    }else if(slide == 3){

        document.getElementById('a').style.display = 'block'

    }else{

        document.getElementById('a').style.display = 'none'

    }
    
    if(slide == 2){

        document.getElementById('b').style.display = 'block'

    }else{

        document.getElementById('b').style.display = 'none'

    }
    
    if(slide == 1){

        document.getElementById('c').style.display = 'block'

    }else{

        document.getElementById('c').style.display = 'none'

    }
    
    if(slide == 0){

        document.getElementById('d').style.display = 'block'

    }else{

        document.getElementById('d').style.display = 'none'

    }

})

menos.addEventListener('click', () => {

    slide--;
    if(slide == -1){

        slide++;

    }else if(slide == 3){

        document.getElementById('a').style.display = 'block'

    }else{

        document.getElementById('a').style.display = 'none'

    }
    
    if(slide == 2){

        document.getElementById('b').style.display = 'block'

    }else{

        document.getElementById('b').style.display = 'none'

    }
    
    if(slide == 1){

        document.getElementById('c').style.display = 'block'

    }else{

        document.getElementById('c').style.display = 'none'

    }
    
    if(slide == 0){

        document.getElementById('d').style.display = 'block'

    }else{

        document.getElementById('d').style.display = 'none'

    }

})