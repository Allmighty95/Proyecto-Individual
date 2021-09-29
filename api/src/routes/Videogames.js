const { Router } = require("express");
const { getVideoGames, getOneVideoGame } = require("../controllers/videogamesController");
const router = Router();

router.get('/', getVideoGames)
router.get('/:id', getOneVideoGame)


module.exports = router;