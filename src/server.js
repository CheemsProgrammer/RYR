//variables de entorno
require('dotenv').config()

//base de datos
require('./controllers/connect')()
const con = conn()

//constantes/dependecias
const express = require('express')
const app     = express()
const url     = process.env.URL
const parser  = require('body-parser')
const ejs     = require('ejs')
const path    = require('path')
const bcrypt  = require('bcrypt')
const fetch   = require('node-fetch')
const jwt     = require('jsonwebtoken')
const Swal    = require('sweetalert2')

//middlewares exportados
const { validateCreate } = require('../src/validation/usuario')
const { validationUser } = require('./validation/validationUsers')

//middlewares
app.use(parser.urlencoded({extended: true}))
app.set('views', path.join(__dirname, '../views'))
app.engine('html', ejs.__express)
app.set('view engine','html')
app.use('/views', express.static(path.join(__dirname, "../views")));

//ponemos a correr el servidor
app.listen(process.env.PORT, () => {
  
  con.connect(() => {

    console.log(`Servidor corriendo en ${url+process.env.PORT}`)

  })

})

//zonas para los renderizados de vistas

//login
app.get(process.env.LOGIN_PATH, function(req,res) {

  res.render("login")

})

//nuestro inicio
app.get(process.env.ROOT_PATH, function(req,res) {

  res.render('inicio')
  
})
  
//registro
app.get(process.env.ROOT_REG, function(req, res){
  
  res.render('registro')
  
})
  
/*app.post(process.env.ROOT_REG, function(req, res){
  
    
  
})*/

//ruta para el registro  
app.post(process.env.HASHV_PATH, /*incorporamos la funcion como middleware*/ validateCreate,(req,res) => {
  
  const { nombre, correo, clave } = req.body

  bcrypt.hash(clave, 10, (err,hash) => {

      if(err) throw err
      
      sql = `INSERT INTO users(nombre, correo, clave) VALUES ('${nombre}', '${correo}', '${hash}');`
      
    con.query(sql, (err, data, fields) => {
      
      if(err) throw err
      res.redirect('/views/login.html')
          
      
    })
      
  })
  
})

//ruta para el login
app.post(process.env.VERIFY, async(req, res) => {

  const {  email, clave } = req.body

  const sql = `SELECT * FROM users WHERE correo = "${email}";`

  const user = await new Promise((resolve,reject)=>{

    con.query(sql,(err,data,fields)=>{

      if(err) throw err

      bcrypt.compare(clave,data[0].clave ,(err,comp)=>{

        if(err) reject(err)
        resolve(comp)

      })

    })

  })

  if(user){

    const payload = {

      email,
      acceso: 'usuario'

    }

    jwt.sign(payload, process.env.KEY, { algorithm:"HS256" }, (err, token) => {

      if(err) throw err

      const createToken = `INSERT INTO token(correo, token) VALUES ('${email}','${token}')`
      con.query(createToken, (err, data, fields) => {

        if(err) throw err
        res.json(token)

      })

    })

  }

})