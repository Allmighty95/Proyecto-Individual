const { Router } = require("express");
const postVideoGame = require("../controllers/videogameController");
const router = Router();

router.post('/', postVideoGame)

module.exports = router;