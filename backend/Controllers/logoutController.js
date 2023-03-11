const User = require("../Models/User");

//Log out User
exports.handleLogoutController = async (req, res) => {
  // On clientside, delete the access token too

  const cookies = req.cookies;

  if (!cookies.jwt) {
    //Cookie was not found, hence no token can be detected
    res.sendStatus(204); //No content to send back and that is fine
  } else {
    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
      // Cookie is found but does not match the user details.
      res.clearCookie("jwt", { httpOnly: true, sameSite: none, secure: true });
      res.sendStatus(204); // All cookies is cleared
    }

    foundUser.refreshToken = "";
    await foundUser.save();

    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    res.sendStatus(204);
  }
};
