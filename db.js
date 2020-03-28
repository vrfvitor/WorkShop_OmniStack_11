const sqlite3 = require("sqlite3").verbose()
const db = new sqlite3.Database("./Workshop.db")

db.serialize(function(){
    // criar tabela
    db.run(`  
    CREATE TABLE IF NOT EXISTS ideas(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        imagem TEXT,
        titulo  TEXT,
        categoria TEXT,
        descricao TEXT,
        link TEXT
        );
        `)
        
/** 
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
    ]    

    db.run(query, values, function(err){
        if (err) return console.log(err);

        console.log("Adicionei!")
    } )
    
     
    */
/** 
    // deletar dados na tabela
    db.run(`DELETE FROM ideas WHERE id = ?`, [], function(err){
        if (err) return console.log(err);
        console.log("Deletei!");
    })

    // consultar dados na tabela
    db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err) return console.log(err);

        console.log(rows)
   } )
*/
})

module.exports = db