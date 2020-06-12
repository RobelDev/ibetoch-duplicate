const express = require("express");
const router = express.Router();
const Profile = require("../../model/Profile");
const User = require("../../model/User");
const config = require("config");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

// @route GET api/profile/property
// @desc Get property profile
// @access private
router.get("/property", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile" });
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
  res.send("profile route");
});

// @route POST api/profile
// @desc Post property profile
// @access private
router.post(
  "/",
  [
    auth,
    [
      check("image", "image is required").not().isEmpty(),
      check("price", "price is required with US dollar").isCurrency(),
      check("yearBuilt", "Year built of property is required").isNumeric(),
      check("address", "address is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const {
      image,
      price,
      totalSquareFt,
      yearBuilt,
      address,
      company,
      website,
      description,
      homeType,
      purpose,
      visit,
      contactInfo,
      authority,
    } = req.body;

    const propertyFields = {
      user: req.user.id,
      image,
      price,
      totalSquareFt,
      yearBuilt,
      address,
      company,
      website,
      description,
      homeType,
      purpose,
      visit,
      contactInfo,
      authority,
    };
    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        //update it
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: propertyFields },
          { new: true }
        );

        return res.json(profile);
      }

      profile = new Profile(propertyFields);

      //save it to mongo db
      await profile.save();
      res.json(profile);

      //   res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route GET api/profile
// @desc Get all property profiles
// @access Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);

    if (!profiles) {
      return res.status(400).json({ msg: "No profiles" });
    }

    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

////////I dont think i need this one
// @route GET api/user/:user_id
// @desc property profile by user ID
// @access Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "No profiles" });
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    if (error.kind == "ObjectId") {
      return res.status(400).json({ msg: "No profiles" });
    }
    res.status(500).send("Server Error");
  }
});

//// todo:- do not remove completely but hiode it when sold/available is selected/false
// @route DELETE api/user/:user_id
// @desc Delete property
// @access Private
router.delete("/", auth, async (req, res) => {
  try {
    // DELETE/REMOVE property profiles
    await Profile.findOneAndRemove({
      user: req.user.id,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
