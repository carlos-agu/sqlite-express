const sqlite3 = require('sqlite3').verbose();

let db =  new sqlite3.Database('./data/db.dat', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE , err=>{
    if(err){        
        return console.error(err);
    }else{
        console.log("Connected to the SQlite database");       
    }
});

function closeDB(){
    db.close();
}

module.exports = {
    db,
    closeDB
}
