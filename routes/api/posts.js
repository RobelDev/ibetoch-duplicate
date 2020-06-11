const express = require("express");
const router = express.Router();

// @route GET api/posts
// @desc Register user
// @access public
router.get("/", (req, res) => {
  res.send("users post");
});

module.exports = router;
