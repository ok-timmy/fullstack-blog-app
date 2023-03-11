const router = require("express").Router();
const { handleLogoutController } = require("../Controllers/logoutController");

//GET REFRESH TOKEN
router.get("/", handleLogoutController);



module.exports = router;