const express = require("express");
const router = express.Router();
const Profile = require("../../model/Profile");
const User = require("../../model/User");
const config = require("config");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const fileUpload = require("../../middleware/fileUpload");
const path = require("path");
const axios = require("axios");

// @route GET api/profile/property
// @desc Get property profile
// @access private
router.get("/property", auth, async (req, res) => {
  try {
    const profile = await Profile.find({
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
      sold,
    } = req.body;

    const propertyFields = {
      user: req.user.id,

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
      sold,
    };
    try {
      let profile = await Profile.findOne({ user: req.user.id });

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

// @route PUT api/profile
// @desc Update property profile
// @access private
router.put(
  "/",
  [
    auth,
    [
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
      sold,
    } = req.body;

    const propertyFields = {
      user: req.user.id,
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
      sold,
    };
    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (!profile) {
        return res.status(400).json({ msg: "No profiles to update" });
      }

      //update it
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: propertyFields },
        { new: true }
      );

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
    const profiles = await Profile.find()
      .populate("user", ["name"])
      .sort({ date: -1 });

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
// @route GET api/:id
// @desc property profile by user ID
// @access Public

router.get("/:id", async (req, res) => {
  try {
    const profile = await Profile.find({
      user: req.params.id,
    }).populate("user", ["name"]);

    if (!profile) {
      return res.status(400).json({ msg: "No profiles found" });
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    if (error.kind == "ObjectId") {
      return res.status(400).json({ msg: "No profiles found" });
    }
    res.status(500).send("Server Error");
  }
});

//// todo:- do not remove completely but hiode it when sold/available is selected/false
// @route DELETE api/user/:user_id
// @desc Delete property
// @access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    // DELETE/REMOVE property profiles

    const property = await Profile.findById(req.params.id);

    if (!property) {
      return res.status(400).json({ msg: "Profile not found!" });
    }
    if (property.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorized user" });
    }

    await property.remove();
    // await Profile.findOneAndRemove({
    //   user: req.params.user_id,
    // });
    //remove user
    // await User.findOneAndRemove({
    //   _id: req.user.id,
    // });

    res.json({ msg: "Property removed!" });
  } catch (error) {
    console.error(error.message);
    if (error.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found!" });
    }
    res.status(500).send("Server Error");
  }
});

// @route PUT api/profile/like/:id
// @desc save/like a property post
// @access private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);

    if (
      profile.interests.filter(
        (interest) => interest.user.toString() === req.user.id
      ).length > 0
    ) {
      return res.status(400).json({ msg: "Profile post aLready liked" });
    }
    //otherwise

    profile.interests.unshift({ user: req.user.id });

    await profile.save();

    res.json(profile.interests);
  } catch (error) {
    console.error(error.message);
    if (error.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found!" });
    }
    res.status(500).send("Server Error");
  }
});

// @route PUT api/profile/unlike/:id
// @desc unlike/dislike a property post
// @access private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);

    if (
      profile.interests.filter(
        (interest) => interest.user.toString() === req.user.id
      ).length === 0
    ) {
      return res.status(400).json({ msg: "Profile post not liked yet" });
    }
    //otherwise

    const interestedIndex = profile.interests
      .map((interested) => interested.user.toString())
      .indexOf(req.user.id);

    profile.interests.splice(interestedIndex, 1);

    await profile.save();

    res.json(profile.interests);
  } catch (error) {
    console.error(error.message);
    if (error.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found!" });
    }
    res.status(500).send("Server Error");
  }
});

// @route PUT api/profile/images/:profile_id
// @desc upload a property picture
// @access private
router.put(
  "/images/:profile_id",
  auth,
  fileUpload.array("images", 9),
  async (req, res) => {
    // //const files = req.files;
    // const imageField = { image };

    try {
      const profile = await Profile.findById(req.params.profile_id);

      // if (profile.images) {
      //   //   //update it
      //   profile.images = await Profile.images.findOneAndUpdate(
      //     //     // { user: req.user.id },
      //     { $set: imageField },
      //     { new: true }
      //   );

      //   return res.json(profile.images);
      // }

      //if not found create a profile
      //imageField = req.files;

      // const imagePath = path.join(__dirname, "fileUpload/images");
      // if (!req.files) {
      //   return res.status(401).json({ msg: "Pick image please" });
      // }

      //const { image } = req.files;
      const imageField = { image: req.files };

      //console.log(req.files.file.filename);
      profile.images.unshift(imageField);
      //profile.images = new Profile.images(imageField);

      // save it to database
      await profile.save();

      //send back the profile
      res.json(profile.images);
      console.log(req.files);
    } catch (error) {
      console.error(error.message);
      if (error.kind == "ObjectId") {
        return res.status(400).json({ msg: "Profile not found!" });
      }
    }
  }
);

// @route DELETE api/profile/image/:image_id
// @desc Delete image from profile by image id
// @access Private
router.delete("/images/:profile_id/:image_id", auth, async (req, res) => {
  try {
    // first fetch the profile we want to delete the experience from
    // const profile = await Profile.findOne({ user: req.user.id });
    const profile = await Profile.findById(req.params.profile_id);

    if (!profile.images) {
      return res.status(400).json({ msg: "there is no photo to delete" });
    }

    //Get remove index
    const removeIndex = profile.images
      .map((item) => item._id)
      .indexOf(req.params.image_id);

    profile.images.splice(removeIndex, 1);
    await profile.save();
    res.json(profile.images);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

///google maps
// @route GET api/profile/google-maps/:address
// @desc Get google map address for a given address
// @access public
router.get("/google-maps/:address", async (req, res) => {
  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      req.params.address
    )}&key=${config.get("GOOGLE_MAP_API_KEY")}
  `);

    if (!response) {
      return res
        .status(422)
        .json({ msg: "Location not found for the given address" });
    }

    const coordinates = await response.data.results[0].geometry.location;

    //console.log(coordinates);
    res.json(coordinates);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
