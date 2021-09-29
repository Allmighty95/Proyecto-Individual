const { Router } = require("express");
const getGenders = require("../controllers/gendersController");

const router = Router();

router.get('/', getGenders)

module.exports = router;