const { Model, DataTypes } = require('sequelize')

class User extends Model {
    static init(sequelize) {
        super.init({
            matricula: DataTypes.STRING,
            nome: DataTypes.STRING,
            senha: DataTypes.STRING
        }, {
            sequelize,
            tableName: 'user'
        })
    }
}

module.exports = User