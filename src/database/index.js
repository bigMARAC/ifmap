const Sequelize = require('sequelize')
const config = require('./../config/db')
const User = require('../models/User')

const conn = new Sequelize(config)
User.init(conn)

module.exports = conn