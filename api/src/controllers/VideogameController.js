
const { Videogame } = require('../db.js');

async function postVideoGame(req, res) {
    const {
        name,
        description,
        background_image,
        releasedate,
        rating,
        platforms,
        gender,
    } = req.body;

    try {
        //-----------------------------------------------------------------------------
        let newVideoGame = await Videogame.create({
            name,
            description,
            background_image,
            releasedate,
            rating,
            platforms,
            gender
        }, {
            fields: ['name', 'description', 'background_image', 'releasedate', 'rating', 'platforms', 'gender']
        })
        //-----------------------------------------------------------------------------
        if (newVideoGame) {
            newVideoGame.setGenders(gender).then(sc=>{
                console.log(sc);
            });
            newVideoGame.setPlatforms(platforms).then(sc=>{
                console.log(sc);
            });
            res.json({
                message: "Videogame Created Successfully",
                data: newVideoGame
            })
        }
        else {
            res.status(500).json({
                message: "Videogame Not Created"
            })
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).json({
            message: "Videogame not created :(",
            data: error,
            request: req.body
        })
    }
}

module.exports = postVideoGame