const express = require('express');
//Clase 8 -> instalo el bodyparser
// nos va a permietir manejar el body muy facilmente

const db=require('./db');
const router = require('./network/routes')

db('mongodb://db_user:Tomas2020@cluster0-shard-00-00.qwyc5.mongodb.net:27017,cluster0-shard-00-01.qwyc5.mongodb.net:27017,cluster0-shard-00-02.qwyc5.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-gtxf62-shard-0&authSource=admin&retryWrites=true&w=majority');

var app = express();

app.use(express.json());
app.use(express.urlencoded({extended : false}));
// app.use(router);
router(app);

app.use('/app',express.static('public'));

app.listen(3000);
console.log('La aplicacion esta escuchando en http://localhost:3000');
