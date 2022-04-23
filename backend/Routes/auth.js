const router = require('express').Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require('../Models/users');

//REGISTER

router.post("/register", async function(req, res) {
    try {

      hashedPassword = await  bcrypt.hash(req.body.password, saltRounds);
    const newUser = await new User( {
          firstName : req.body.firstName,
          secondName : req.body.secondName,
          userName : req.body.userName,
          email : req.body.email,
          password : hashedPassword
      } )

      const user = await newUser.save();
      res.status(200).json(user);
      console.log('Save successful')
      
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
})

//LOGIN 
router.post('/login', async function(req, res) {
    try {
        const foundUser =await User.findOne({email: req.body.email});
        console.log(foundUser);
        if(foundUser) {
            console.log("User was found")
            const validate =  bcrypt.compare(req.body.password, foundUser.password)
            validate && console.log("User exist!!")
            const {password, ...others} = foundUser._doc;

            const token = jwt.sign({foundUser}, 'secretkey', {expiresIn: "2h"}
            )
            res.status(200).json({others, token}); 
        }else {
            console.log("User Was not found")
            res.status(401).send({message: "User does not exist"})
        }
    } catch (error) {
        console.log(error)
    }
})

// UPDATE USER

router.put('/:id', async function (req, res) {
    var user = {id: req.params.id};
   const updatedUser = await User.findByIdAndUpdate(user, {$set: req.body}, {new:true});
   res.status(200).json(updatedUser);
} )



function verifyToken (req, res, next) {
    //Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if header is undefined 
    if (typeof bearerHeader !== 'undefined') {
        //get token from bearer header
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
    }

    else {
        console.log("Can't Login")
    }

}

module.exports = router;