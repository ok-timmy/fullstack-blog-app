const router = require("express").Router();
const { handleLogoutController } = require("../Controllers/logoutController");

//LOG OUT USER
router.get("/", handleLogoutController);



module.exports = router;