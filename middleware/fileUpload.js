const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const config = require("config");
const path = require("path");

// const uuidv4 = require("uuid/v4");
// const path = require("path");
///aws.config.setPromisesDependency();
// aws.config.update({
//   accessKeyId: config.get("AWS_KEY"),
//   secretAccessKey: config.get("AWS_SECRET"),
//   Bucket: config.get("AWS_BUCKET"),
//   region: config.get("REGION"),
// });

// const s3 = new aws.S3();

// const fileUpload = multer({
//   limits: 100000000, //100Mb
//   storage: multerS3({
//     s3: s3,
//     bucket: config.get("AWS_BUCKET"),
//     acl: "public-read-write",
//     metadata: function (req, file, cb) {
//       cb(null, { fieldName: file.fieldname });
//     },
//     key: function (req, file, cb) {
//       cb(null, Date.now().toString());
//     },
//   }),

//   //storage: upload,
//   fileFilter: (req, file, cb) => {
//     if (
//       file.mimetype === "image/jpeg" ||
//       file.mimetype === "image/jpg" ||
//       file.mimetype === "image/png"
//     ) {
//       cb(null, true);
//     } else {
//       cb(
//         new Error(
//           `Error: upload images only with extension of jpeg, jpg, or png!`,
//           false
//         )
//       );
//     }
//   },
// });

// const filetypes = /jpeg|jpg|png/;
// const extname = filetypes.test(
//   path.extname(file.originalname).toLowerCase()
// );
// const mimetype = filetypes.test(file.mimetype);
// if (mimetype && extname) {
//   return cb(null, true);
// } else {
//   cb("Error: upload images only with extensions of jpeg, jpg or png !");
// }
// const validUpload = !!MIME_TYPE[file.mimetype];
// let error = validUpload ? null : new Error("Invalid extension");
// cb(error, validUpload);
// const MIME_TYPE = {
//   "image/jpg": "jpg",
//   "image/jpeg": "jpeg",
//   "image/png": "png",
// };

// const fileUpload = multer({
//   limits: 100000000, //100Mb
//   storage: upload,
//   fileFilter: (req, file, cb) => {
//     const filetypes = /jpeg|jpg|png/;
//     const extname = filetypes.test(
//       path.extname(file.originalname).toLowerCase()
//     );
//     const mimetype = filetypes.test(file.mimetype);
//     if (mimetype && extname) {
//       return cb(null, true);
//     } else {
//       cb("Error: Allow images only with extensions of jpeg, jpg or png !");
//     }
//     // const validUpload = !!MIME_TYPE[file.mimetype];
//     // let error = validUpload ? null : new Error("Invalid extension");
//     // cb(error, validUpload);
//   },
// });

// const MIME_TYPE = {
//   "image/jpg": "jpg",
//   "image/jpeg": "jpeg",
//   "image/png": "png",
// };
const fileUpload = multer({
  limits: 100000000,
  storage: multer.memoryStorage({
    destination: (req, file, cb) => {
      cb(null, `fileUploads/photos`);
      // cb(null, "fileUploads/photos");
    },
    filename: (req, file, cb) => {
      const extension = MIME_TYPE[file.mimetype];
      cb(
        null,
        file.fieldname + "-" + file.originalname + Date.now() + "." + extension
      );
    },
    //file.originalname +
  }),
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png"
    ) {
      cb(null, true);
    } else {
      cb(
        new Error(
          `Error: upload images only with extension of jpeg, jpg, or png!`,
          false
        )
      );
    }
  },
});

module.exports = fileUpload;
