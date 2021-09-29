const { Gender } = require('../db');

async function getGenders(req, res) {
    try {
        const genders = await Gender.findAll()
        if (genders) {
            res.json({
                message: "genders found",
                results: genders
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "gender not found :(",
            data: error
        })
    }
}

module.exports = getGenders