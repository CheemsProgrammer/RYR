require('dotenv').config()
require('./controllers/connect')()
const connection = conn()

const express = require('express')
const app     = express()
const port    = process.env.PORT
const url     = process.env.URL
const parser  = require('body-parser')
const ejs     = require('ejs')
const path    = require('path')
const bcrypt  = require('bcrypt')
const fetch   = require('node-fetch')
const jwt     = require('jsonwebtoken')

app.use(parser.urlencoded({extended: true}))
app.set('views', path.join(__dirname, '../views'))
app.engine('ejs', ejs.__express)
app.set('view engine', 'ejs')
app.use(express.static(__dirname+'../views'))

app.listen(port, function() {
  connection.connect(function () {
    console.log(`Server running on ${url+port}`)
  })
})

app.get(process.env.ROOT_PATH, function(req,res) {
  res.render("register")
})

app.get(process.env.LOGIN_PATH, function(req,res) {
  res.render("login")
})

app.get('/hash/:value', function(req,res) {
  const { value } = req.params
  bcrypt.hash(value, 10, function(err,hash) {
    if(err) throw err
    res.send(hash)
  })
})

app.get('/hash/compare/:value', function(req,res) {
  const { value } = req.params
  bcrypt.compare(value, '$2b$10$2tzWQHotqzJIul9D1Nmlv.jm8eAtWfb4/ZZjtb5e9Cd5pYXRLa8Zu', function (err,comp) {
    if(err) throw err
    res.send(comp)
  })
})

app.post('/add/user', function(req,res) {
  const { email, password } = req.body
  bcrypt.hash(password, 10, function(err, hash) {
    if(err) throw err
    var sql = `INSERT INTO users (correo, password) VALUES ('${email}', '${hash}')`
    connection.query(sql, function(err,data,fields) {
      if(err) throw err
      res.send("user registered")
    })
  })
})

app.post('/user/login', async (req,res) => {
  const { email, password } = req.body
  var sql = `SELECT * FROM users WHERE correo = '${email}'`

  const user = await new Promise((resolve, reject) => {
    connection.query(sql, function(err,data,fields) {
      bcrypt.compare(password, data[0].password, function(err,comp) {
        if(err) reject(err)
        resolve(comp)
      })
    })
  })

  if(user) {
    const payload = {
      correo: email,
      clave: password,
      acceso: "usuario"
    }

    jwt.sign(payload,process.env.KEY, { algorithm: "HS256", expiresIn: 86400 }, (err,token) => {
      if (err) throw err

      sql = `INSERT INTO login (correo,token) VALUES ('${email}', '${token}');`

      connection.query(sql, (err) => {
        if(err) throw err
        res.send("Token registrado en la base de datos")
      })
    })
  }else{
    res.send("Hay un problema")
  }
})

// primera forma: Callbacks
// función que recibe como argumento otra función y la ejecuta
app.get('/asincronismo/callbacks', function (req,res) {
  console.log('Primer mensaje')

  setTimeout(() => {
    console.log('Segundo mensaje')
  }, 2000)

  // () => {} = arrow functions ES6   this
  // 1segundo = 1000ms

  console.log('Tercer mensaje')

  res.send('Hola mundo')
})

// segunda forma: Promesas
// callbacks que esperan por la ejecución de otros callbacks
app.get('/asincronismo/promesas', (req,res) => {
  // setTimeout(() => {
  //   console.log("primer callback")
  //   setTimeout(() => {
  //     console.log("segundo callback")
  //     setTimeout(() => {
  //       console.log("tercer callback")
  //     }, 8000)
  //   }, 5000)
  // }, 3000)

  // usaremos random user para ver el comportamiento de las promesas
  // then y catch
  const respuestaPromesa = fetch('https://randomuser.me/api')
    .then((datos) => {
      return datos.json()
    })
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      console.log(err)
    })
})

// tercera forma: async / await
// Un promesa que espera por la respuesta de una o más ejecuciones
app.get('/asincronismo/asywait', async (req,res) => {
  const respuestaPromesa = await fetch('https://randomuser.me/api')
  const promesaJSON      = await respuestaPromesa.json()
  res.json(promesaJSON)
})

// Promesas que devuelven un resultado
// Promise
app.get('/buscar/usuario', async (req,res) => {
  var sql = `SELECT correo FROM users WHERE correo = 'andi@root.com';`

  var correo = await new Promise((resolve, reject) => {
    connection.query(sql, (err,data,fields) => {
      if(err) return reject(err)
      return resolve(data)
    })
  })

  res.render('login', { correo })
})

// Variables de entorno y jsonwebtoken
// jsonwebtoken
// payload    = Información a encriptar
// privateKey = Llave para desencriptar la información
// algoritmo  = El método de encriptación
// función    = Devuelve dos valores: err y token
app.get('/jwt/create/:user/:access', (req,res) => {
  const { user, access } = req.params
  const payload = {
    usuario: user,
    acceso: access
  }

  jwt.sign(payload, process.env.KEY, { algorithm: "HS256", expiresIn: 86400 }, (err,token) => {
    if(err) throw err
    res.send(token)
  })
})

app.get('/jwt/verify/:key/:token', (req,res) => {
  const { key, token } = req.params

  jwt.verify(token, key, (err,decoded) => {
    if(err) throw err
    if (decoded.acceso == "administrator") {
      res.send('Bienvenido Administrador')
    } else {
      res.send('Hola Usuario')
    }
  })
})