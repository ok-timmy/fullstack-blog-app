const User = require("../Models/User");
const jwt = require("jsonwebtoken");

exports.handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies.jwt) {
    res.sendStatus(401);
  } else {
    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({ refreshToken }).exec();

    if (!foundUser) {
      console.log("No cookies found", 3)
      res.sendStatus(403);
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || decoded.email !== req.body.email) res.sendStatus(403);

        const accessToken = jwt.sign(
          {
            email: decoded.email,
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "200m",
          }
        );
        console.log("No cookies found", 4)
        res.json({ accessToken });
      }
    );
  }
};
