const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
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
      property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "property",
      },
    },
  ],
  images: [
    {
      key: {
        type: String,
      },
      bucket: {
        type: String,
      },
      locationUrl: {
        type: String,
      },
    },
  ],

  price: {
    type: String,
    required: true,
    trim: true,
  },

  totalSquareFt: {
    type: String,
  },

  yearBuilt: {
    type: String,
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
    default: "sale",
  },
  contactInfo: {
    type: String,
  },
  availability: {
    type: Date,
  },

  sold: {
    type: Boolean,
    default: false,
  },
  bathroom: {
    type: String,
  },
  bedroom: {
    type: String,
  },
  parking: {
    type: String,
  },

  coordinates: {
    type: Object,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Property = mongoose.model("property", PropertySchema);
