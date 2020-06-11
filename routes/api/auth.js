const express = require("express");
const router = express.Router();

// @route GET api/auth
// @desc Authenticate a user
// @access public
router.get("/", (req, res) => {
  res.send("Auth user");
});

module.exports = router;
