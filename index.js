require('dotenv').config();
const express = require('express')
const cors = require('cors');
const { dbConnection } = require('./database/config');

const app = express();


//Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));


//Base de datos
dbConnection();

//Rutas
app.use('/api/usuarios', require('./routes/usuario'));
app.use('/api/auth', require('./routes/auth'));

app.listen(3000, () => {
    console.log('Servidor inicializado en el puerto 3000')
})