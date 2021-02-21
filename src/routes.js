const express = require('express')
const UserController = require('./controllers/UserController')

const routes = express.Router()

routes.post('/register', UserController.store) // cria um novo usuário
routes.get('/login', UserController.auth) // autentica um usuário

module.exports = routes