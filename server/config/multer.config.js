const multer = require("multer");
const path = require("path"); // Added for cleaner path handling

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //cb(null, path.join(__dirname, "../src/images/")); // Use absolute path
    cb(null, path.join(null, "../../client/src/images_multer/")); // Use absolute path
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

const uploadImage = upload.single("image"); // Middleware for single image upload

module.exports = {
  uploadImage,
};