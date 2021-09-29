const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('gender', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.TEXT
        }
    }, {
        timestamps: false
    });
};