//esto es los parametros que sigue el registro por si algun dato es incorrecto

const { check } = require('express-validator') 
const { validateResult } = require('./ayudanteValidacion')

//middleware a utilizar
const validateCreate = [

    check('nombre')
        .exists()
        .not()
        .isEmpty(),
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
module.exports = { validateCreate }