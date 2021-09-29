const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('videogame', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT
        },
        background_image: {
            type: Sequelize.TEXT
        },
        releasedate: {
            type: Sequelize.DATE
        },
        rating: {
            type: Sequelize.FLOAT
        },
    }, {
        timestamps: false
    });
};