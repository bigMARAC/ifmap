const bcrypt = require('bcrypt')
const User = require('../models/User')
const Sequelize = require('sequelize')
const { use } = require('../routes')

module.exports = {
    async store(req, res) {
        const { matricula, nome, senha } = req.body

        if (matricula && nome && senha) {
            bcrypt.hash(senha, 7, async function (err, hash) {
                if (!err) {
                    const check = await User.findOne({
                        where: { matricula }
                    })

                    if (!check) {
                        const user = await User.create({ matricula, nome, senha: hash })

                        return res.status(200).json({ user })
                    } else {
                        return res.status(400).json({ erro: 'Matrícula em uso' })
                    }
                } else {
                    return res.status(400).json({ erro: err })
                }
            })
        } else {
            return res.status(400).json({ erro: 'Campos inválidos' })
        }
    },

    async auth(req, res) {
        const { matricula, senha } = req.body

        if (matricula && senha) {
            const user = await User.findOne({
                where: { matricula }
            })

            if (user) {

                bcrypt.compare(senha, user.senha, (err, result) => {
                    if (err) {
                        return res.status(400).json({ erro: err })
                    }

                    if (result) {
                        return res.status(200).json({ auth: true, id: user.id, nome: user.nome, matricula: user.matricula })
                    }

                    return res.status(401).json({ erro: 'Senha inválida' })
                })

            } else {
                return res.status(400).json({ erro: 'Matrícula inválida' })
            }

        } else {
            res.status(400).json({ erro: 'Campos inválidos' })
        }
    }
}