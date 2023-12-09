const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Library = sequelize.define('library',{
    id:{
        type: Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    name:Sequelize.STRING,
    takenOn:Sequelize.STRING,
    returnDate:Sequelize.STRING,
    fine:{
        type:Sequelize.DECIMAL,
        defaultValue:0.00
    },
    returnedBook:{
        type:Sequelize.BOOLEAN,
        defaultValue:false
    },
    returnedDate:{
        type:Sequelize.STRING,
        defaultValue:'',
    }
    
});

module.exports = Library;