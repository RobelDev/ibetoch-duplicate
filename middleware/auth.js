const jwt = require("jsonwebtoken");
const config = require("config");

//Here i could use express-jwt npm package
//module.exports = expressJwt({secret: config.get("jwtSecretKey")})

module.exports = function (req, res, next) {
  //Get header token
  const authToken = req.header("auth-token");

  if (!authToken) {
    return res.status(401).json({ msg: "No given Token." });
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

//seperate for admin middleware
// module.exports = function (req, res, next) {
//   //Get header token
//   const authToken = req.header("auth-token");

//   if (!authToken) {
//     return res.status(401).json({ msg: "No given Token." });
//   }

//   // verify it if theres one using jwt verify
//   try {
//     const decoded = jwt.verify(authToken, config.get("jwtSecretKey"));

//     req.user = decoded.user;
// if(decoded.user.admin!=="admin"){
// return some error
//}
// req.role = decoded.user.role

//
//     next();
//   } catch (error) {
//     res.status(401).json({ msg: "Invalid Token" });
//   }
// };
