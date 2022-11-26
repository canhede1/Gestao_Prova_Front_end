const express = require('express');

const app = express();
const axios = require('axios').default;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static('public'));

app.set('view engine', 'ejs');

// ROTAS DE CADASTRO DE CATEGORIA
app.get('/cadastroCategoriasProvas', (req, res)=>{
    res.render('categoria/index');
});

app.get('/HomeScreen', (req, res)=>{
    res.render('categoria/homeScreen');
});


//ROTA DE LISTAGEM DE CATEGORIAS
app.get('/listagemCategoriasProvas', (req, res)=>{
    
    const urlListagemCategoria = 'http://localhost:3000/listarCategoriaProva';

    /*
    CHAMADA PELO AXIOS:
    1 - URL DA ROTA (urlListagemCategoria)
    2 - CALLBACK DA RESPOSTA DA CHAMADA
    */
    axios.get(urlListagemCategoria)
        .then(
            (response)=>{
                // console.log(response.data);
                // res.send(response.data);
                let categorias = response.data;
                res.render('categoria/listagemCategoriaProva', {categorias});

        }); 
    });

    // ROTA DE LISTAGEM DE EDIÇÂO
    app.get('/formEdicaoCategoriasProvas/:id', (req, res)=>{

        // RECEBE O ID DE CATEGORIA QUE VAI SER EDITADO
        let {id} = req.params;
        console.log(id);

        //CHMADA DO AXIOS PARA A API
        const urlListagemCategoria = `http://localhost:3000/listarCategoriaProva/${id}`;

        axios.get(urlListagemCategoria)
        .then(
            (response)=>{

                let categoria = response.data;
                res.render('categoria/editarCategoriaProva', {categoria});

            }
        )
    });

    app.post('/alterarCategoriaProva', (req, res)=>{

        const urlAlterarCategoria = 'http://localhost:3000/alterarCategoriaProva';
        console.log(req.body);

        axios.put(urlAlterarCategoria, req.body)
        .then(
            res.send('ALTERADO!')
        )

    });

    //ROTA DE EXCLUSÃO
    app.get ('/deletarCategoriaProva/:id',(req, res)=>{
        let id = req.params.id;
        const urlDeletarCategoria = `http://localhost:3000/excluirCategoriaProva/${id}`;
        axios.delete(urlDeletarCategoria, req.body)
        .then(
            res.send('DELETADO')
        )});

app.listen(3001, ()=>{
    console.log('SERVIDOR RODANDO EM: http://localhost:3001');
});