//libreria de mysql
const mysql = require('mysql')

//conexion a base de datos mysql
const db = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '40252507',
    database: 'cruddatabase'
})

db.connect(function (err) {
    if(err){
        console.log(err);
        return;
    }else {
        console.log('BASE DE DATOS CONECTADA')
    }
})


module.exports = db