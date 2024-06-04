function trocarIcon(){
    let menu = document.querySelector('.mobile-menu')
    console.log(menu)
    if(menu.classList.contains('open')){
        menu.classList.remove('open')
        document.querySelector('.icon').src = "assets/images/icons/menu-hamburguer.png"
    }else {
        menu.classList.add('open')
        document.querySelector('.icon').src = "assets/images/icons/botao-fechar.png"
    }
}