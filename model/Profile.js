const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  interests: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    },
  ],

  share: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    },
  ],
  images: [
    {
      image: {
        type: Object,
        // value: "",
      },

      // imageURL: {
      //   type: String,
      // },
    },
  ],

  // images: {
  //   type: Object,
  // },

  price: {
    type: String,
    required: true,
    trim: true,
  },

  totalSquareFt: {
    type: String,
  },

  yearBuilt: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },

  company: {
    type: String,
  },
  website: {
    type: String,
  },
  description: {
    type: String,
  },
  homeType: {
    type: String,
  },
  purpose: {
    type: String,
    default: "For Sale",
  },

  visit: {
    type: Date,
  },
  contactInfo: {
    type: String,
  },
  sold: {
    type: Boolean,
    default: false,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
