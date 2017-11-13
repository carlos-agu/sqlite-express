const express = require('express');
const app = express();
const conn = require('./db');
const bp = require('body-parser');

app.use(express.static('public'));
app.use(bp.urlencoded({extended:false}));
app.use(bp.json());

app.get('/listado', (req,res)=>{
    conn.db.serialize(()=>{
        conn.db.all("select * from articulo", (err,rows)=>{
            if(!err){
                res.send(rows);
            }else{
                console.log(err);
                res.send("Error")
            }
        })
    });    
});

app.post('/guardar', (req,res)=>{
    console.log(req.body);
    let qry = `insert into articulo values(${req.body.id}, '${req.body.desc}', ${req.body.costo})`;
    conn.db.run(qry, (err)=>{
        if(!err){
            res.redirect("/");
        }
    })    
})

app.listen(8000, ()=>{
    console.log("App escuchando en http://localhost:8000");
    process.on("exit", () => {
        console.log("Cerrando applicación...");
        conn.closeDB();
      });
});