const express = require("express");
const router = express.Router();

// @route GET api/profile
// @desc Register user
// @access public
router.get("/", (req, res) => {
  res.send("house/apt route");
});

module.exports = router;
