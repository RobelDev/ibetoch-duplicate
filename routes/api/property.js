const express = require("express");
const router = express.Router();
const Property = require("../../model/Property");
const User = require("../../model/User");
const config = require("config");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const fileUpload = require("../../middleware/fileUpload");
const path = require("path");
const axios = require("axios");
const fs = require("fs");
const sharp = require("sharp");

const aws = require("aws-sdk");

// @route POST api/property/profile
// @desc Post property profile
// @access private
router.post(
  "/profile",
  [
    auth,
    [
      check("price", "price is required with US dollar").isCurrency(),
      check("yearBuilt", "Year built of property is required").not().isEmpty(),
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
      contactInfo,
      availability,
      sold,
      bathroom,
      bedroom,
      parking,
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
      contactInfo,
      availability,
      sold,
      bathroom,
      bedroom,
      parking,
    };
    try {
      // let profile = await Profile.findOne({ user: req.user.id });

      const property = new Property(propertyFields);

      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${config.get("GOOGLE_MAP_API_KEY")}
  `);

      if (!response) {
        return res
          .status(422)
          .json({ msg: "Location not found for the given address" });
      }
      //console.log(response.data.results[0].geometry);
      property.coordinates = await response.data.results[0].geometry.location;

      //save it to mongo db
      await property.save();
      res.json(property);

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
  "/profile/:prop_id",
  [
    auth,
    [
      check("price", "price is required with US dollar").isCurrency(),
      check("yearBuilt", "Year built of property is required").not().isEmpty(),
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
      contactInfo,
      availability,
      sold,
      bathroom,
      bedroom,
      parking,
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
      contactInfo,
      availability,
      sold,
      bathroom,
      bedroom,
      parking,
    };
    try {
      let property = await Property.findById(req.params.prop_id);

      if (!property) {
        return res.status(400).json({ msg: "Property not found" });
      }

      //make sure it belongs to the right user

      if (property.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: "User not authorized" });
      }

      await property.updateOne({ $set: propertyFields }, { new: true });

      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${config.get("GOOGLE_MAP_API_KEY")}
  `);

      if (!response) {
        return res
          .status(422)
          .json({ msg: "Location not found for the given address" });
      }
      //console.log(response.data.results[0].geometry);
      property.coordinates = await response.data.results[0].geometry.location;

      //save it to mongo db
      await property.save();

      res.json(property);

      //   res.json(profile);
    } catch (error) {
      console.error(error.message);
      if (error.kind == "ObjectId") {
        return res.status(400).json({ msg: "No property profile found" });
      }
      res.status(500).send("Server Error");
    }
  }
);

// @route GET api/profile/property
// @desc Get a single user's propertys list profile
// @access private
router.get("/profile/me", auth, async (req, res) => {
  try {
    const propertys = await Property.find({
      user: req.user.id,
    })
      .populate("user", ["name"])
      .sort({ date: -1 });

    if (!propertys) {
      return res.status(400).json({ msg: "There is no profile" });
    }

    res.json(propertys);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
  //res.send("profile route");
});

// @route GET api/profile
// @desc Get all property profiles
// @access Public
router.get("/profile/all", async (req, res) => {
  try {
    const propertys = await Property.find()
      .populate("user", ["name"])
      .sort({ date: -1 });

    if (!propertys) {
      return res.status(400).json({ msg: "No profiles" });
    }

    res.json(propertys);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

////////I dont think i need this one
// @route GET api/:id
// @desc property profile by user ID
// @access Public

router.get("/profile/:prop_id", async (req, res) => {
  try {
    const property = await Property.findById(
      req.params.prop_id
    ).populate("user", ["name"]);

    if (!property) {
      return res.status(400).json({ msg: "No property found" });
    }

    res.json(property);
  } catch (error) {
    console.error(error.message);
    if (error.kind == "ObjectId") {
      return res.status(400).json({ msg: "No property found" });
    }
    res.status(500).send("Server Error");
  }
});

//// todo:- do not remove completely but hiode it when sold/available is selected/false
// @route DELETE api/user/:user_id
// @desc Delete property
// @access Private
router.delete("/profile/:prop_id", auth, async (req, res) => {
  try {
    // DELETE/REMOVE property profiles

    const property = await Property.findById(req.params.prop_id);

    if (!property) {
      return res.status(400).json({ msg: "Profile not found!" });
    }
    if (property.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorized user" });
    }

    await property.remove();

    res.json({ msg: "Property removed!" });
  } catch (error) {
    console.error(error.message);
    if (error.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found!" });
    }
    res.status(500).send("Server Error");
  }
});

// @route PUT api/property/like/:id
// @desc save/like/unlike a property post
// @access private
router.put("/profile/like/:prop_id", auth, async (req, res) => {
  try {
    const property = await Property.findById(req.params.prop_id);

    if (!property) {
      return res.status(400).json({ msg: "Profile not found!" });
    }
    if (property.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorized user" });
    }

    if (
      property.interests.filter(
        (interest) => interest.user.toString() === req.user.id
      ).length > 0
    ) {
      // return res
      //   .status(400)
      //   .json({ msg: "Property Profile post aLready liked" });

      //Unlike it
      const interestedIndex = property.interests
        .map((interested) => interested.user.toString())
        .indexOf(req.user.id);

      property.interests.splice(interestedIndex, 1);

      //mylistProp.mylist.splice(mylistIndex, 1);

      await property.save();
      res.json({
        interests: property.interests,
        msg: "Unliked/unsaved from list",
      });
    } else {
      property.interests.unshift({ user: req.user.id });
      //mylistProp.populate()
      //mylistProp.mylist.populate("property");

      //mylistProp.mylist.unshift({ property: req.params.prop_id });

      await property.save();

      //await mylistProp.save();
      // await mine.save();

      res.json({ interests: property.interests, msg: "Liked/saved to lists" });
      //res.json(mylistProp.mylist);
    }
  } catch (error) {
    console.error(error.message);
    if (error.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found!" });
    }
    res.status(500).send("Server Error something not right");
  }
});

// @route PUT api/profile/images/:profile_id
// @desc upload a property picture
// @access private
const s3 = new aws.S3({
  accessKeyId: config.get("AWS_KEY"),
  secretAccessKey: config.get("AWS_SECRET"),
});
router.put(
  "/profile/images/:prop_id",
  fileUpload.single("image"),
  auth,
  async (req, res) => {
    // //const files = req.files;
    // const imageField = { image };

    //const { reqfiles } = req.files;
    // const imageField = { images.map() };

    //console.log(req.file);
    //console.log(req.propertyFields.location);

    try {
      if (!req.file) {
        return res.status(400).json({ msg: "Pick image/s please" });
      }
      const property = await Property.findById(req.params.prop_id);
      if (!property) {
        return res.status(400).json({ msg: "property not found!" });
      }
      if (property.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: "Not Authorized user" });
      }

      let uploadedImage = req.file.originalname.split(".");

      const MimeType = uploadedImage[uploadedImage.length - 1];

      const buff = sharp(req.file.buffer).resize(640, 480);

      // const s3 = new aws.S3();

      const params = {
        //ACL: "public-read",
        Bucket: config.get("AWS_BUCKET"),
        Key: `${Date.now()}.${MimeType}`,
        Body: buff,
        //Body: req.file.buffer,
        ACL: "public-read",
      };

      s3.upload(params, async (err, data) => {
        if (err) {
          console.log(err);
          return res
            .status(400)
            .json({ msg: "Error occured while uploading to S3 bucket" });
        }

        const newLocationUrl = {
          user: req.user.id,

          key: data.Key,
          bucket: data.Bucket,
          locationUrl: data.Location,
        };

        // property.images.property.images.locationUrl = data.location;

        await property.images.push(newLocationUrl);

        await property.save();

        res.json(property.images);
      });
    } catch (error) {
      console.error(error);
      console.log("images server error");
      // if (error.kind == "ObjectId") {
      //   return res.status(400).json({ msg: "Profile not found!" });
      // }
    }
    // }
  }
);

//work on this and address later anddd test---solved
// @route DELETE api/profile/image/:image_id
// @desc Delete image from profile by image id
// @access Private
router.delete("/profile/images/:prop_id/:image_id", auth, async (req, res) => {
  try {
    // const profile = await Profile.findOne({ user: req.user.id });
    const property = await Property.findById(req.params.prop_id);

    if (!property) {
      return res.status(400).json({ msg: "No property to delete from" });
    }

    if (property.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorized user" });
    }

    // if (property.images === null) {
    //   return res.status(400).json({ msg: "there is no photo to delete" });
    // }

    const image = property.images.find(
      (image) => image.id === req.params.image_id
    );

    if (!image) {
      return res
        .status(404)
        .json({ msg: "Image already deleted or not found" });
    }

    const params = {
      //ACL: "public-read",
      Bucket: config.get("AWS_BUCKET"),
      Key: image.key,
      // ACL: "public-read",
    };

    s3.deleteObject(params, (err, data) => {
      if (err) {
        console.log(err);
        return res
          .status(400)
          .json({ msg: "Error occured while deleting image from S3 bucket" });
      }
    });
    // if (image.user.toString() !== req.user.id) {
    //   return res.status(401).json({ msg: "Not Authorized user" });
    // }

    property.images = property.images.filter(
      ({ id }) => id !== req.params.image_id
    );

    // if (images.id.toString() !== req.user.id) {
    //   return res.status(401).json({ msg: "Not Authorized user" });
    // }

    //await image.remove();
    // if (image.user.toString() !== req.user.id) {
    //   return res.status(401).json({ msg: "Not your property profile" });
    // }

    //Get remove index
    // const removeIndex = property.images
    //   .map((item) => item._id)
    //   .indexOf(req.params.image_id);

    // property.images.splice(removeIndex, 1);
    await property.save();
    //res.send("image removed");
    res.json(property.images);
  } catch (err) {
    console.error(error.message);
    if (error.kind == "ObjectId") {
      return res.status(400).json({ msg: "Properyty Profile not found!" });
    }
    res.status(500).send("Server Error");
  }
});

///google maps
// @route GET api/profile/google-maps/:address
// @desc Get google map address for a given address
// @access public
router.get("/google-maps/:address", async (req, res) => {
  //const {address} = req.body

  if (!req.params.address) {
    return res.status(404).json({ msg: "No input address" });
  }
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
    //console.log(response.data.results[0].geometry);
    const coordinates = await response.data.results[0].geometry.location;

    //console.log(coordinates);

    await res.json(coordinates);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//Get liked property

router.get("/likedpropertys", auth, async (req, res) => {
  const property = await Property.find();

  // const myList = await MyList.findById(req.user.id);

  //get all property
  //loop throught the propertys if they have your user id on their likes array
  try {
    const arrayProperts = [];

    // if (
    //   property.map(
    //     (singleproperty) =>
    //       singleproperty.interests.filter(
    //         (interest) => interest.user.toString() === req.user.id
    //       ).length > 0
    //   )
    // )
    //  {
    property.map((singleproperty) => {
      singleproperty.interests.filter((interest) =>
        interest.user.toString() === req.user.id
          ? arrayProperts.push(singleproperty)
          : //console.log(singleproperty)
            ""
      );
    });
    // const singleprop = property.map((singleproperty) => singleproperty._id);

    //console.log(arrayProp);
    res.json(arrayProperts);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

router.get(
  "/search/:address/:purpose/:homeType/:bedroom/:bathroom",

  // ",
  async (req, res) => {
    const propertys = await Property.find();

    const queryAddress = req.params.address;
    const queryPurpose = req.params.purpose;
    const queryBedroom = req.params.bedroom;
    const queryBathroom = req.params.bathroom;
    const queryHomeType = req.params.homeType;

    if (
      !queryAddress ||
      !queryPurpose ||
      !queryBedroom ||
      !queryBathroom ||
      !queryHomeType
    ) {
      return res.status(400).json({ msg: "Please fill up the search form" });
    }
    //get all property
    //loop throught the propertys if they have your user id on their likes array
    try {
      const arrayPropertys = [];

      // res.json(filteredPropertys);

      propertys.map((property) => {
        property.address.toLowerCase().indexOf(queryAddress.toLowerCase()) !==
          -1 &&
          property.purpose.includes(queryPurpose) !== -1 &&
          property.homeType.includes(queryHomeType) !== -1 &&
          property.bedroom >= queryBedroom !== -1 &&
          property.bathroom >= queryBathroom &&
          arrayPropertys.push(property);
        // : //console.log(singleproperty)
        //   (arrayPropertys = [ msg: "Not found" ]);
      });

      res.json(arrayPropertys);
      // const singleprop = property.map((singleproperty) => singleproperty._id);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
