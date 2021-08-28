const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        await await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Base de datos conectada')
    } catch (error) {
        console.log('Hubo un error', error)
    }


}

module.exports = {
    dbConnection
}