const router = require("express").Router();
const { check } = require("express-validator");
const {
  createUser,
  loginUser,
  getUserData,
  updateUserData
} = require("../Controllers/authController");

//REGISTER NEW USER
router.post(
  "/register",
  check("email", "Please Enter A Valid email").isEmail(),
  check("password", "A Valid Password Is Required").exists(),
  createUser
);

//LOGIN USER TO THEIR ACCOUNT
router.post("/login", loginUser);

//GET USER DATA
router.get("/:email", getUserData);

// UPDATE USER DETAILS
router.put("/:id", updateUserData);

module.exports = router;
