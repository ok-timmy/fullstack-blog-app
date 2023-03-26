const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const cookie = require("cookie-parser");
const { validationResult } = require("express-validator");
const saltRounds = 10;
const User = require("../Models/User");

exports.createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Check If User already exist and return appropriate error.
  const checkUserExist = await User.findOne({ email: req.body.email });
  if (checkUserExist) {
    return res
      .status(409)
      .json({ statusCode: 409, message: "This Email Already exists" });
  }

  try {
    hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const newUser = await new User({
      firstName: req.body.firstName,
      secondName: req.body.secondName,
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    res.status(200).json(user);
    // console.log("Save successful");
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

exports.loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const foundUser = await User.findOne({ email: req.body.email });
    // console.log(foundUser);
    if (foundUser) {
      // console.log("User was found");
      const validate = await bcrypt.compare(
        req.body.password,
        foundUser.password
      );

      if (validate) {
        const accessToken = jwt.sign(
          { username: foundUser.email },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "120s" }
        );

        const refreshToken = jwt.sign(
          { userEmail: foundUser.email },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "1d" }
        );

        foundUser.refreshToken = refreshToken;
        await foundUser.save();

        res.cookie("jwt", accessToken, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24,
          // sameSite: "None",
          // secure: true,  This has to be in production mode
        });

        const { email } = foundUser;
        res.status(200).json({ email, accessToken });
      } else {
        res.status(401).json({ error: "Incorrect Password" });
      }
    } else {
      // console.log("User Was not found");
      res.status(401).send({ message: "User does not exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(403).send({ message: error });
  }
};

exports.getUserData = async (req, res) => {
  try {
    const foundUser = await User.findOne({ email: req.params.email });
    console.log(foundUser);
    const { password, ...others } = foundUser._doc;
    res.status(200).json(others);
    // console.log("User Found");
  } catch {
    console.log(error);
  }
};

exports.updateUserData = async (req, res) => {
  try {
    var userId = { _id: req.params.id };
    // console.log(userId);
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    // console.log("User Updated Successfully!");
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(403).send(error);
  }
};