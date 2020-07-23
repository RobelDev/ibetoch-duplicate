const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
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
    type: Number,
    required: true,
    trim: true,
  },

  totalSquareFt: {
    type: Number,
    required: true,
  },

  yearBuilt: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },

  company: {
    type: String,
    required: true,
  },
  website: {
    type: String,
  },
  description: {
    type: String,
  },
  homeType: {
    type: String,
    required: true,
  },
  purpose: {
    type: String,
    default: "sell",
  },

  availability: {
    type: Date,
  },

  sold: {
    type: Boolean,
    default: false,
  },
  bathroom: {
    type: Number,
  },
  bedroom: {
    type: Number,
  },
  parking: {
    type: Number,
  },

  coordinates: {
    type: Object,
  },
  contactPhone: {
    type: String,
  },
  contactEmail: {
    type: String,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Property = mongoose.model("property", PropertySchema);
