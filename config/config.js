const dotenv = require('dotenv').config()

const TIEMPO_EXPIRACION = 20000;
const URL_BASE_DE_DATOS = process.env.MONGO_CONNECTION;

module.exports = {
    TIEMPO_EXPIRACION,
    URL_BASE_DE_DATOS
}
