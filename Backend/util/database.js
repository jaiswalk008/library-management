const Sequelize = require('sequelize');
const sequelize = new Sequelize('nodeproject','root','karan123',{
    dialect:'mysql',
    host:'localhost'
});

module.exports = sequelize;