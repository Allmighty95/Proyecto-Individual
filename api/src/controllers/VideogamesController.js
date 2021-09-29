const { Videogame } = require('../db');
const { Op } = require("sequelize");

async function getVideoGames(req, res) {
    try {
        const { name } = req.query;
        let videoGames
        if (name) {
            videoGames = await Videogame.findAll({
                where: {
                    name: {
                        [Op.like]: `%${name}%`
                    }
                }
            })
        }
        else {
            videoGames = await Videogame.findAll()
        }
        if (videoGames) {
            res.json({
                message: "videogames found",
                results: videoGames
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "videogames not found :(",
            data: error
        })
    }
}

async function getOneVideoGame(req, res) {
    const { id } = req.params
    try {
        //------------------------------------------------------------
        const videoGames = await Videogame.findOne({
            where: {
                id
            }
        })
        //------------------------------------------------------------
        if (videoGames) {
            res.json({
                message: "videogames found",
                data: videoGames
            })
        }
        else{
            res.status(500).json({
                message: "videogames not found :(",
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "videogames not found :(",
            data: error
        })
    }
}




module.exports = {
    getVideoGames,
    getOneVideoGame
}