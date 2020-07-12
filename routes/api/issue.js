const express = require("express");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const User = require("../../model/User");
const config = require("config");
const router = express.Router();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(config.get("SENDGRID_API_KEY"));

// @route POST api/issue
// @desc contact us
// @access private
router.post(
  "/contactus",
  [
    auth,
    [
      check("name", "Name is required, please").not().isEmpty(),
      check("email", "Email is required, please").isEmail(),
      check("subject", "Subject is required, please").not().isEmpty(),
      check("message", "Message is required, please").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { name, email, subject, message } = req.body;
    try {
      //check if user already exists
      let user = await User.findById(req.user.id);

      // (error, token) => {
      //   if (error) throw error;
      //   //return res.json({ token });
      // }

      const userIssueEmailData = {
        from: config.get("EMAIL_ISUUE"),
        to: config.get("iBetochEmail"),
        subject: subject,

        html: `${message} 
        <hr />
        Send from email: ${email} please reply to this email`,
      };

      //ES8 send grid mail

      await sgMail.send(userIssueEmailData, (err, mailed) => {
        if (err) throw err;
        res.json({
          msg: `Email has been sent team@ibetoch.com. It may take upto 1 bussiness day to reply to your issue. Thank you for reaching out.  `,
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

router.post(
  "/affilate",
  [
    auth,
    [
      check("name", "Name is required, please").not().isEmpty(),
      check("email", "Email is required, please").isEmail(),
      check("subject", "Subject is required, please").not().isEmpty(),
      check("message", "Message is required, please").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { name, email, social, subject, message } = req.body;
    try {
      //check if user already exists
      let user = await User.findById(req.user.id);

      // (error, token) => {
      //   if (error) throw error;
      //   //return res.json({ token });
      // }

      const businessEmailData = {
        from: config.get("EMAIL_BUSINESS"),
        to: config.get("iBetochEmail"),
        subject: subject,

        html: `${message} 
        <br />
        Social/Company name: ${social}
          <hr />
          Send from email: ${email} please reply to this email for bussiness inquiries.
          <br />
          Registered user: Name: ${user.name} and email: ${user.email}`,
      };

      //ES8 send grid mail

      await sgMail.send(businessEmailData, (err, mailed) => {
        if (err) throw err;
        res.json({
          msg: `Email has been sent team@ibetoch.com. It may take upto 1 bussiness day to reply to your business inquiries. Thank you for reaching out.  `,
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

router.post(
  "/report",
  [
    auth,
    [check("reason", "Reason for report is required, please").not().isEmpty()],
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { reason, _id } = req.body;

    try {
      //check if user already exists
      //   let property = await Property.findById(prop_id);

      //   if (!property) {
      //     return res.status(400).json({ msg: "Property not found" });
      //   }

      let user = await User.findById(req.user.id);

      // (error, token) => {
      //   if (error) throw error;
      //   //return res.json({ token });
      // }

      const reportEmailData = {
        from: config.get("EMAIL_REPORT"),
        to: config.get("iBetochEmail"),
        subject: reason,

        html: `${reason}  for Property Id: ${_id}

            Take a look at the reported property at: 
            ${config.get("CLIENT_URL")}/propertys/viewproperty/${_id}
          <hr />
          Send from email: ${user.email} please reply to this email`,
      };

      //ES8 send grid mail

      await sgMail.send(reportEmailData, (err, mailed) => {
        if (err) throw err;
        res.json({
          msg: `Sucessfully reported to iBetoch. We will take appropriate measures to inspect the issue. If required, we will reach out to you.
         Thank you for reaching out.  `,
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

module.exports = router;
