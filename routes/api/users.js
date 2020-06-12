const express = require("express");
const { check, validationResult } = require("express-validator");
const User = require("../../model/User");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const config = require("config");
const router = express.Router();

// @route POST api/users
// @desc Register user
// @access public
router.post(
  "/",
  [
    check("name", "Name is required, please").not().isEmpty(),
    check("email", "Valid email is required, please").isEmail(),
    check(
      "password",
      "Password is required with 6 or more characters, please"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      //check if user already exists
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists!" }] });
      }

      //Get users gravatar
      const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });

      //create a user
      user = new User({ name, email, password, avatar });

      //Encrypt password
      const salt = await bcryptjs.genSalt(10);

      user.password = await bcryptjs.hash(password, salt);

      //save user to database
      await user.save();

      //sign it with jwt and return the token
      // 1st create payload
      const payload = {
        user: {
          id: user.id,
        },
      };
      //2nd sign it
      jwt.sign(
        payload,
        config.get("jwtSecretKey"),
        { expiresIn: 36000 },
        (error, token) => {
          if (error) throw error;
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
