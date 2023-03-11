const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const saltRounds = 10;
const User = require("../Models/users");

exports.createUser = async (req, res) => {
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
}

exports.loginUser = async (req, res) => {
    try {
        const foundUser = await User.findOne({ email: req.body.email });
        // console.log(foundUser);
        if (foundUser) {
          // console.log("User was found");
          const validate = await bcrypt.compare(
            req.body.password,
            foundUser.password
          );
          // console.log(validate);
    
          if (validate) {
            const { password, ...others } = foundUser._doc;
            const token = jwt.sign({ foundUser }, "secretkey", { expiresIn: "2h" });
            res.cookie("jwt", token, { httpOnly: true, maxAge: 60 });
            res.status(200).json({ others, token });
          } else {
            res.status(401).json({ error: "Incorrect Password" });
          }
        } else {
          // console.log("User Was not found");
          res.status(401).send({ message: "User does not exist" });
        }
      } catch (error) {
        console.log(error);
      }
}

exports.getUserData = async(req, res) => {
    try {
        const foundUser = await User.findOne({ email: req.params.email });
        console.log(foundUser);
        const { password, ...others } = foundUser._doc;
        res.status(200).json(others);
        // console.log("User Found");
      } catch {
        console.log(error);
      }
}

exports.updateUserData = async(req, res) => {
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
}
