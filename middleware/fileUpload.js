const multer = require("multer");
const uuidv4 = require("uuid/v4");
const path = require("path");

const MIME_TYPE = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
};
const fileUpload = multer({
  limits: 1000000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "fileUploads/photos");
    },
    filename: (req, file, cb) => {
      const extension = MIME_TYPE[file.mimetype];
      cb(null, file.fieldname + "-" + Date.now() + "." + extension);
    },
    //file.originalname +
  }),
  fileFilter: (req, file, cb) => {
    const validUpload = !!MIME_TYPE[file.mimetype];
    let error = validUpload ? null : new Error("Invalid extension");
    cb(error, validUpload);
  },
});

module.exports = fileUpload;
