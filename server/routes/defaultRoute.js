const router = require("express").Router();

const defaultController = require("../controllers/defaultController");

router.post("/", defaultController.get_Your_Life_Path_Number_Evaluation);

module.exports = router;
