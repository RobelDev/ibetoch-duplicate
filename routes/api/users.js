const express = require("express");
const { check, validationResult } = require("express-validator");
const User = require("../../model/User");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const config = require("config");
const router = express.Router();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(config.get("SENDGRID_API_KEY"));

// @route POST api/users
// @desc Register user
// @access public
router.post(
  "/register",
  [
    check("name", "Name is required, please").not().isEmpty(),
    check("email", "Email is required, please").isEmail(),
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

      if (user && user.active === true) {
        return res.status(400).json({
          errors: [{ msg: "User already exists with the given email!" }],
        });
      } else if (user && user.active === false) {
        const salt = await bcryptjs.genSalt(10);

        user.password = await bcryptjs.hash(password, salt);

        user.name = name;

        //save user to database
        await user.save();

        const payload = {
          user: {
            id: user.id,
          },
        };
        //2nd sign it
        //const token
        const token = await jwt.sign(
          payload,
          config.get("jwtSecretKeyRegister"),
          {
            expiresIn: "1d",
          }
        );

        // (error, token) => {
        //   if (error) throw error;
        //   //return res.json({ token });
        // }

        const verificationEmailData = {
          from: config.get("EMAIL_FROM"),
          to: email,
          subject: `New Acount Activation Link`,

          html: `
        <p> <strong>Welcome to iBetoch...</strong> Find your next home at Ibetoch </p> <br /> 
        <p> Please use this link to verify your email to activate your new account </p>
        <p> This link will expire in 24 hours </p>
              
        <h4><a href=${config.get(
          "CLIENT_URL"
        )}/api/users/activate/${token}> Click here to Activate Account </a> </h4>
        <hr />
        <hr />
          <p> For more information, Visit ${config.get(
            "CLIENT_URL"
          )} </p>        
        <p> This email may contain sensitive information. </p>
        `,
        };

        //ES8 send grid mail

        await sgMail.send(verificationEmailData, (err, mailed) => {
          if (err) throw err;
          res.json({
            token,
            msg: `Email has been sent to ${email}. It may take upto 3 minutes. Please go to your email to activate your account `,
          });
        });
      } else if (!user) {
        //Get users gravatar
        // const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });

        //create a user
        user = new User({ name, email, password });

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
        //const token
        const token = jwt.sign(payload, config.get("jwtSecretKeyRegister"), {
          expiresIn: "1d",
        });

        const verificationEmailData = {
          from: config.get("EMAIL_FROM"),
          to: email,
          subject: `New iBetoch Acount Activation Link`,

          html: `
        <p> <strong>Welcome to iBetoch...</strong>  Find your next home at Ibetoch </p> <br /> <p> Please use this link to verify your email to activate your new account </p>
        <p> This link will expire in 24 hours </p>
        <strong>click the link here to verify </strong>
        <h4><a href=${config.get(
          "CLIENT_URL"
        )}/api/users/activate/${token}> Activate Account </a> </h4>
        <hr />
        <hr />
        <p> For more information, Visit ${config.get("CLIENT_URL")} </p>        
      <p> This email may contain sensitive information. </p>
        `,
        };

        //ES8 send grid mail

        await sgMail.send(verificationEmailData, (err, mailed) => {
          if (err) throw err;
          res.json({
            token,
            msg: `Email has been sent to ${email}. It may take upto 3 minutes. Please go to your email to activate your account `,
          });
        });
      }
    } catch (error) {
      console.error(error.message);
      if (error.response) {
        console.error(error.response.body);
      }
      res.status(500).send("Server error");
    }
  }
);

// @route POST api/users/activate
// @desc verify users email
// @access public
///api/users/activate
router.post("/activate", async (req, res) => {
  const { token } = req.body;

  try {
    if (!token) {
      return res.status(401).json({
        msg: "There is no valid token!",
      });
    }

    await jwt.verify(
      token,
      config.get("jwtSecretKeyRegister"),
      async (err, decoded) => {
        if (err) {
          return res.json({
            msg: "Link expired or wrong token. Please register again!",
          });
        }

        const user = await User.findById(decoded.user.id);
        if (!user) {
          return res
            .status(400)
            .json({ msg: "No user or Token is already activated" });
        }
        //return res.send("hello");
        user.active = true;
        //await User.updateOne({ active: true });
        //save user to database
        await user.save();
        res.json({
          token,
          msg: "Successfully signed up! please sign in to continue...",
        });
      }
    );
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }
    res.status(500).send("Server error");
    // res.status(500).send("Server error");
  }
});

// @route PUT api/users
// @desc send emaail if user forgot password
// @access public
router.put(
  "/forgot",
  [check("email", "Email is required, please").isEmail()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { email } = req.body;
    try {
      //check if user already exists
      let user = await User.findOne({ email });

      if (!user || user.active === false) {
        return res.status(404).json({
          errors: [{ msg: "No user with this email. Please register first!" }],
        });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };
      //2nd sign it
      //const token
      const token = jwt.sign(payload, config.get("jwtSecretKeyForgot"), {
        expiresIn: "1d",
      });

      //await User.updateOne({ resetPassword: token });

      //user.resetPassword = token;

      const resetEmailData = {
        from: config.get("EMAIL_FROM"),
        to: email,
        subject: `Reset Password Link`,

        html: `
        <p> <strong>Welcome to iBetoch...</strong>  Find your next home at Ibetoch </p> <br />
         <p> Please use this link to reset your password. </p>
        <p> This link will expire in 24 hours </p>
       
        <h4><a href=${config.get(
          "CLIENT_URL"
        )}/api/users/reset/${token}> Click here to reset password </a> </h4>
        <hr />
        <hr />
        <p> For more information, Visit ${config.get("CLIENT_URL")} </p>        
        <p> This email may contain sensitive information. </p>
        `,
      };

      //ES8 send grid mail

      await sgMail.send(resetEmailData, (err, mailed) => {
        if (err) throw err;
        res.json({
          token,
          // user,
          msg: `Email has been sent to ${email}. It may take upto 3 minutes. Please go to your email to reset your password `,
        });
      });
    } catch (error) {
      console.error(error.message);
      if (error.response) {
        console.error(error.response.body);
      }
      res.status(500).send("Server error");
    }
  }
);

// @route PUY api/users
// @desc reset password password
// @access public
router.put(
  "/reset",
  [
    check(
      "newPassword",
      "Password is required with 6 or more characters, please"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { newPassword, token } = req.body;

    try {
      if (!token) {
        return res
          .status(400)
          .json({ errors: [{ msg: "There is no valid reset link token!" }] });
      }

      await jwt.verify(
        token,
        config.get("jwtSecretKeyForgot"),
        async (err, decoded) => {
          if (err) {
            return res.json({
              msg: "Link expired or wrong token. Please register again!",
            });
          }
          //check if user already exists
          let user = await User.findById(decoded.user.id);

          // this if block is non-important
          if (!user || user.active === false) {
            return res.status(400).json({
              errors: [{ msg: "No user with thhis email. Please register!" }],
            });
          }

          //then hash the new password and save it instead of the new one
          //Encrypt password
          const salt = await bcryptjs.genSalt(10);

          user.password = await bcryptjs.hash(newPassword, salt);

          await user.save();

          res.json({ token, msg: "Succesfully password reset." });
        }
      );

      // const decoded = await jwt.decode(token);
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
