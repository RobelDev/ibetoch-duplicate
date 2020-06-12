const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const User = require("../../model/User");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const config = require("config");

// @route GET api/auth
// @desc Authenticate a user
// @access public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/auth
// @desc Log in a user
// @access public
router.post(
  "/",
  [
    check("email", "Valid email is required, please").isEmail(),
    check("password", "Password is required with, please").exists(),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials!" }] });
      }

      //compare password from backend and the entered one
      const matchPassword = await bcryptjs.compare(password, user.password);

      if (!matchPassword) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials!" }] });
      }
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
        { expiresIn: 360000 },
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

// facebook log in

module.exports = router;
