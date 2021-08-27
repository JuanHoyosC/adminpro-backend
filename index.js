require('dotenv').config();
const express = require('express')
const cors = require('cors');
const { dbConnection } = require('./database/config');

const app = express();


//Middleware
app.use(cors())

//Base de datos
dbConnection();

app.listen(3000, () => {
    console.log('Servidor inicializado en el puerto 3000')
})