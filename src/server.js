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

//middlewares exportados
const { validateCreate } = require('../src/validation/usuario')

//middlewares
app.use(parser.urlencoded({extended: true}))
app.set('views', path.join(__dirname, '../views'))
app.engine('ejs', ejs.__express)
app.set('view engine','ejs')
app.use('/views', express.static(path.join(__dirname, "../views")));

//ponemos a correr el servidor
app.listen(process.env.PORT, () => {
  
  con.connect(() => {

    console.log(`Servidor corriendo en ${url+process.env.PORT}`)

  })

})

//zonas para los renderizados de vistas

//moderator
app.get(process.env.OPERATOR, (req, res) => {

  sql = `SELECT * FROM USERS`;
  con.query(sql, (err, data, fields) => {

    if(err) throw err
    res.render('moderator', {data1:data})

  })

})

app.get(process.env.ERRMSJ, (req, res) => {

  res.render('err_registro')

})

//login
app.get(process.env.LOGIN_PATH, (req,res) => {

  res.render("login")

})

//nuestro inicio
app.get(process.env.ROOT_PATH, (req,res) => {

  res.render('inicio')
  
})
  
//registro
app.get(process.env.ROOT_REG, (req, res) => {
  
  res.render('registro')
  
})
  
//lugar general
app.get(process.env.RYR, function(req, res){
  
    res.render('ryr')
  
})

//crear
app.get(process.env.CREATE, function(req, res){
  
  res.render('crear')

})

//ruta para el registro  
app.post(process.env.HASHV_PATH, /*incorporamos la funcion como middleware*/ validateCreate,(req,res) => {
  
  const { nombre, correo, clave } = req.body

  bcrypt.hash(clave, 10, (err,hash) => {

      if(err) throw err
      
      sql = `INSERT INTO users(nombre, correo, clave) VALUES ('${nombre}', '${correo}', '${hash}');`
      
    con.query(sql, (err, data, fields) => {
      
      if(err) throw err
      res.redirect('/login')
          
      
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
        res.redirect(process.env.RYR)

      })

    })

  }

})