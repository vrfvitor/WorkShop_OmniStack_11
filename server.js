//usando express para cirar e configurar o servidor
const express = require("express")
const server = express()

// configurando o nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure('view', {
    express: server,
    noCache: true,
})

// configurando arquivos estaticos, pasta public
server.use(express.static("public"))

// configurando o uso do req.body
server.use(express.urlencoded({ extended: true}))

// configurando database
const db = require('./db')

// criando uma rota / e capturando a request
server.get("/", function(req, res){

    db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err) {
            console.log(err);
            return res.send("Erro no banco de dados!");
        }

        const reversedIdeas = [...rows].reverse();

        const lastIdeas = [];
    
        for(idea of reversedIdeas){
            if(lastIdeas.length < 2){
                lastIdeas.push(idea);
            }
        }
        return res.render('index.html', {ideas:lastIdeas});
        
    } )
    
});

server.get("/ideas", function(req, res){

    db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err) {
            console.log(err);
            return res.send("Erro no banco de dados!");
        }

        const reversedIdeas = [...rows].reverse();
    
        return res.render('ideias.html', { ideas:reversedIdeas });
    });
});

server.get("/delete", function(req,res){
    const id = req.query["id"];

    db.run(`DELETE FROM ideas WHERE id = ?`, [id], function(err){
        if (err) {
            console.log(err);
            return res.send("Erro no banco de dados!");
        }

        return res.redirect("/ideas");
    })
});

server.post("/", function(req, res){

    // inserir dados na tabela
    const query = `
            INSERT INTO ideas(
            imagem,
            titulo,
            categoria,
            descricao,
            link
    ) VALUES(?,?,?,?,?);`

    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,
    ]    

    db.run(query, values, function(err){
        if (err) {
            console.log(err);
            return res.send("Erro no banco de dados!");
        }

        console.log("Adicionei!")
        return res.redirect("/ideas")
    } )
})


// ligando o servidor na porta 3000
server.listen(3000)