const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  //Get header token
  const authToken = req.header("auth-token");

  if (!authToken) {
    return res.status(401).json({ msg: "Token is not authtorized" });
  }

  // verify it if theres one using jwt verify
  try {
    const decoded = jwt.verify(authToken, config.get("jwtSecretKey"));

    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid Token" });
  }
};
