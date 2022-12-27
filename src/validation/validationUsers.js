//esto es los parametros que sigue el login para que ningun dato sea incorrecto

const { check } = require('express-validator') 
const { validateResult } = require('./ayudanteValidacion')


//middlewares a utilizar
const validationUser = [
    check('correo')
        .exists()
        .not()
        .isEmpty()
        .isEmail(),
    check('clave')
        .exists()
        .isLength({ min: 8 })
        .not()
        .isEmpty(),

    (req, res, next) => {

        validateResult(req, res, next)

    }
]

//modulo exportable
module.exports = { validationUser }