const router = require("express").Router();
const { handleRefreshToken } = require("../Controllers/refreshTokenController");

//GET REFRESH TOKEN
router.get("/", handleRefreshToken);



module.exports = router;