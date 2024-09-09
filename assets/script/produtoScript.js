//Arays para receber prrodutos no carrinho e favoritos
let cart = [];
let fav = [];

//comentario generico

async function requisicaoDB() {

    pegarDoStorage()

    const produtos = await fetch('https://senac-back.azurewebsites.net/api/produtos');
    const todosProdutos = await produtos.json();

    let main = document.getElementById('loja');
    let mainTitle = document.querySelector("h1");


    for (let a = 0; a < todosProdutos.length; a++) {

        addProdutos(todosProdutos[a], main, mainTitle, a);
    }

    atualizarCart();
    atualizarFav();
};

function pegarDoStorage() {
    const cartStorage = localStorage.getItem("cart");
    if (cartStorage) {
        cart = JSON.parse(cartStorage);
        contador()
    }

    const favStorage = localStorage.getItem("favoritos");
    if (favStorage) {
        fav = JSON.parse(favStorage);
    }
}

function buttonClick(btn, id, todosProdutos) {

    //adicionando um ouvinte de eventos nos botoes carrinho
    btn.addEventListener('click', (event) => {

        let carrinho = document.getElementById(`carrinho${id}`);


        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id == `carrinho${id}`) {
                carrinho.src = 'assets/images/icons/shopping-cart1.png';
            }
        }
        //condicao logica para alteracao da imagem do carrinho ao click
        if (carrinho.src.includes('assets/images/icons/shopping-cart.png')) {
            carrinho.src = 'assets/images/icons/shopping-cart1.png';
            //adiconando produtos ao carrinho.
            cart.push({ nome: todosProdutos.nome, preco: todosProdutos.preco, id: `carrinho${id}` });
            salvarStorage()
        } else {

            //trocando imagem e removendo produtos do carrinho
            carrinho.src = 'assets/images/icons/shopping-cart.png';
            for (let i = 0; i < cart.length; i++) {
                if (cart[i].id == (event.target.id)) {
                    cart.splice(i, 1);
                    salvarStorage()
                }
            }
        }
        contador()
    });
}

function contador() {

    //Capturando elementos da barra de busca, e manipulando o contador de acordo com a largura da array cart.
    let divIcones = document.getElementsByClassName('icones');
    let contador = document.createElement('div');
    contador.classList.add('contador');
    contador.innerHTML = '';
    let limpador = document.getElementsByClassName('contador')
    contador.innerHTML = cart.length;

    if (cart.length > 0) {
        for (let i = 0; i < limpador.length; i++) {
            limpador[i].innerHTML = "";
        }
        divIcones[0].appendChild(contador)
    } else if (cart.length < 1) {
        for (let i = 0; i < limpador.length; i++) {
            limpador[i].innerHTML = "";
        }
    }
}

function favicon(btn, id, todosProdutos) {

    //adicionando um ouvinte de eventos nos botoes favoritos
    btn.addEventListener('click', (event) => {

        let favoritos = document.getElementById(`favoritos${id}`);

        //condicao logica para alteracao da imagem de favoritos ao click
        if (favoritos.src.includes('assets/images/icons/estrela.png')) {
            favoritos.src = 'assets/images/icons/estrela(1).png';

            //adiconando produtos aos favoritos.
            fav.push({ nome: todosProdutos.nome, preco: todosProdutos.preco, id: `favoritos${id}` });
            salvarStorage()
        } else {

            //trocando imagem e removendo produtos dos favoritos
            favoritos.src = 'assets/images/icons/estrela.png';
            for (let i = 0; i < fav.length; i++) {
                if (fav[i].id == (event.target.id)) {
                    fav.splice(i, 1);
                    salvarStorage();
                }
            }
        }
    });
}

async function procurar() {

    const produtos = await fetch('https://senac-back.azurewebsites.net/api/produtos');
    const todosProdutos = await produtos.json();

    //Capturando elementos para manipulacao

    const main = document.getElementById('loja');
    const mainTitle = document.querySelector("h1");
    const divInput = document.createElement('div');
    divInput.classList.add('divInput');
    const limparDivInput = document.getElementsByClassName('divInput');

    //limpando a div que recaberá a barra de buasca    
    for (let i = 0; i < limparDivInput.length; i++) {
        limparDivInput[i].innerHTML = "";
    }

    // criando a barra de busca e adiconando classe
    let divIcone = document.getElementById('div-icones');
    let input = document.createElement('input');

    input.placeholder = 'pesquisar';
    let botaoBuscar = document.createElement('div');
    botaoBuscar.innerHTML = "";

    botaoBuscar.classList.add('botao-buscar')
    botaoBuscar.innerHTML = 'Buscar'

    divInput.appendChild(input);
    divInput.appendChild(botaoBuscar);
    divIcone.appendChild(divInput);

    //adicionando ouvinte de eventos
    botaoBuscar.addEventListener('click', () => {

        // condicao logica para caso o campo esteja vazio
        if (input.value.length == 0) {
            alert('Por favor digite algo.');

        } else if (input.value.length != 0) {

            const main = document.getElementById('loja');
            let count = 0
            for (let i = 0; i < todosProdutos.length; i++) {

                //condicao logia para pesquisa pelo input.
                if (todosProdutos[i].secao == mainTitle.id) {

                    let NomeTeste = (todosProdutos[i].nome).toUpperCase();
                    let inputTeste = input.value.toUpperCase();

                    if (NomeTeste.includes(inputTeste)) {

                        count++
                        //caso sejam encontrados produtos é executada uma funcao para limpar a tela
                        limparLinha();
                    }
                }

                //caso o contador seja 0, significa que náo foram encontrado produtos na busca.    
            } if (count == 0) {
                alert('Não foram encontrados itens');
            }

            // Foi realizado um laco par pesquisar os produtos, e caso o laco seja verdadeiro havera este laco para acreascentar os produtos na tela. 
            let count1 = 1

            for (let i = 0; i < todosProdutos.length; i++) {

                if (todosProdutos[i].secao == mainTitle.id) {

                    let NomeTeste = (todosProdutos[i].nome).toUpperCase();
                    let inputTeste = input.value.toUpperCase();

                    if (NomeTeste.includes(inputTeste)) {

                        count1++

                        addProdutos(todosProdutos[i], main, mainTitle, i);
                        atualizarCart();
                        atualizarFav();
                    }
                }
            }
        }
    });
}

function comprar() {

    if (cart.length == 0) {
        alert("Seu carrinho de compras está vazio.")
    } else {
        // esta funcao limpa a tela e mostra uma tabela com todos os produtos na array cart
        const main = document.getElementById('loja');
        main.innerHTML = "";
        const table = document.createElement('table');
        table.innerHTML = `<thead>
                            <tr>
                                <td>Produtos</td>
                                <td>Valor</td>  
                            </tr>
                        </thead>`;
        let total = 0;
        for (let i = 0; i < cart.length; i++) {
            table.innerHTML += `<tbody>
                                <tr>
                                    <td>${cart[i].nome}</td>
                                    <td>R$ ${cart[i].preco.toFixed(2)}</td>
                                </tr>
                            </tbody>`;
            total = total + cart[i].preco;
        }
        table.innerHTML += `<tbody>
                            <tr>
                                <td><strong>Total</strong></td>
                                <td><strong>R$ ${total.toFixed(2)}</strong></td>
                            </tr>
                        </tbody>`;
        let divTable = document.createElement('div');
        divTable.id = 'divTable'
        let body = document.querySelector('body');
        divTable.appendChild(table)
        main.appendChild(divTable);

        divBotoes(divTable);
    }
}

async function favoritos() {

    //funcao para limpar a tela e exibir os favoritos, caso exitam favoritos.
    const produtos = await fetch('https://senac-back.azurewebsites.net/api/produtos');
    const todosProdutos = await produtos.json();

    const main = document.getElementById('loja');
    const mainTitle = document.querySelector("h1");

    if (fav.length == 0) {
        alert("Seu Favoritos está vazio.")
    }


    for (let i = 0; i < fav.length; i++) {

        for (let c = 0; c < todosProdutos.length; c++) {

            if (fav[i].nome == todosProdutos[c].nome && fav[i].preco == todosProdutos[c].preco) {
                limparLinha();
                mainTitle.innerHTML = "Favoritos";
                let h1 = document.createElement('h1');
                h1.innerHTML = 'Favoritos';
                main.appendChild(h1);
            }
        }
    }

    let count = 1;

    for (let i = 0; i < fav.length; i++) {

        for (let c = 0; c < todosProdutos.length; c++) {

            if (fav[i].nome == todosProdutos[c].nome && fav[i].preco == todosProdutos[c].preco) {

                count++

                somenteCard(todosProdutos[c], main, mainTitle, c)
            }
        }
    }
    atualizarCart();
    atualizarFav();
}

function descricao(btn, titulo, imagem, descricao, preco, id) {

    //funcao para exibir a descricao do produto
    btn.addEventListener('click', () => {

        const main = document.getElementById('loja');
        const mainTitle = document.querySelector("h1");

       
        limparLinha();
        mainTitle.innerHTML = titulo;
        main.appendChild(mainTitle)

        const produtoCard = document.createElement('div');
        produtoCard.classList.add('produtos');

        const produtoFoto = document.createElement('img');
        produtoFoto.classList.add('imgProduto')
        produtoFoto.src = imagem;
        produtoFoto.id = `imagem${id}`;

        const descricaoF = document.createElement('p');
        descricaoF.innerHTML = descricao;

        const valor = document.createElement('p');
        valor.classList.add('preco');
        valor.innerHTML = `R$ ${preco.toFixed(2)}`
        valor.id = `preco${id}`
        // main.appendChild(linha);

        const botoes = document.createElement('div');
        botoes.classList.add('botoes');

      
        produtoCard.appendChild(produtoFoto);


        produtoCard.appendChild(descricaoF);
        produtoCard.appendChild(botoes);

        let divTable = document.createElement('div');
        divTable.appendChild(produtoCard)
        main.appendChild(divTable);
        divTable.id = 'divTable';
        main.appendChild(divTable);

        divBotoes(divTable);

        window.scrollTo({
            top: 0,
            transition: '0.8s'
        })
    });
}

function limparLinha() {
    let limparLinha = document.getElementById('loja');
    limparLinha.innerHTML = ""
}


function divBotoes(main) {
    const divBotoes = document.createElement("div");
    divBotoes.classList.add('divBotoes');

    const botaoComprar = document.createElement("div");
    botaoComprar.innerHTML = 'Comprar'
    botaoComprar.classList.add('botoesCarrinho');
    divBotoes.appendChild(botaoComprar)

    const botaoVoltar = document.createElement("div");
    botaoVoltar.innerHTML = 'Voltar'
    botaoVoltar.classList.add('botoesCarrinho');
    divBotoes.appendChild(botaoVoltar);

    main.appendChild(divBotoes);

    botaoComprar.addEventListener('click', () => {
        alert("Compra realizada com sucesso.")
        localStorage.removeItem('cart')
        // localStorage.removeItem('favoritos');
        window.location.reload();
    })

    botaoVoltar.addEventListener('click', () => {
        window.location.reload();
    });
}

function addProdutos(todosProdutos, main, mainTitle, a) {

    if (todosProdutos.secao == mainTitle.id) {

        somenteCard(todosProdutos, main, mainTitle, a)

    }
}


// salvar no localStorage
function salvarStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('favoritos', JSON.stringify(fav));
}

function atualizarCart() {
    for (let i = 0; i < cart.length; i++) {

        if (document.getElementById(cart[i].id)) {
            const imgCarrinho = document.getElementById(cart[i].id);
            imgCarrinho.src = 'assets/images/icons/shopping-cart1.png';
        }
    }
};

function atualizarFav() {
    for (let i = 0; i < fav.length; i++) {

        if (document.getElementById(fav[i].id)) {
            const imgFav = document.getElementById(fav[i].id);
            imgFav.src = 'assets/images/icons/estrela(1).png';
        }
    }
};

function somenteCard(todosProdutos, main, mainTitle, a) {
    let id = todosProdutos.id;
    let nome = todosProdutos.nome;
    let preco = todosProdutos.preco;
    let imagem = todosProdutos.imagem;
    let descricaoProd = todosProdutos.descricao;

    const produtoCard = document.createElement('div');
    produtoCard.classList.add('produtos');

    const produtoFoto = document.createElement('img');
    produtoFoto.classList.add('imgProduto')
    produtoFoto.src = imagem;
    produtoFoto.id = `imagem${id}`

    const titulo = document.createElement('p');
    titulo.classList.add('titulo');
    titulo.innerHTML = nome;
    titulo.id = `nome${id}`

    const estrela = document.createElement('p');
    estrela.innerHTML = '★★★★★';

    const valor = document.createElement('p');
    valor.classList.add('preco');
    valor.innerHTML = `R$ ${preco.toFixed(2)}`
    valor.id = `preco${id}`

    const botoes = document.createElement('div');
    botoes.classList.add('botoes');

    const favoritos = document.createElement('img');
    const btn1 = document.createElement('button');
    btn1.classList.add('botao');
    favoritos.src = 'assets/images/icons/estrela.png';
    favoritos.id = `favoritos${id}`
    btn1.appendChild(favoritos);
    favicon(btn1, id, todosProdutos);

    const carrinho = document.createElement('img');
    const btn2 = document.createElement('button');
    btn2.classList.add('botao');
    carrinho.src = 'assets/images/icons/shopping-cart.png';
    carrinho.id = `carrinho${id}`
    btn2.id = `botao${id}`
    btn2.appendChild(carrinho);
    buttonClick(btn2, id, todosProdutos);


    const compra = document.createElement('img');
    const btn3 = document.createElement('button');
    btn3.classList.add('botao');
    btn3.id = `descricao${a}`;
    compra.src = 'assets/images/icons/descricao-alternativa.png';
    descricao(btn3, todosProdutos.nome, imagem, descricaoProd, preco, id, todosProdutos.id);
    btn3.appendChild(compra);

    botoes.appendChild(btn2);
    botoes.appendChild(btn1);
    botoes.appendChild(btn3);

    main.appendChild(produtoCard);
    produtoCard.appendChild(produtoFoto);
    produtoCard.appendChild(titulo);
    produtoCard.appendChild(estrela)
    produtoCard.appendChild(valor);
    produtoCard.appendChild(botoes);
}

window.onload = requisicaoDB;

