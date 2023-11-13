const multer = require('multer');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        try {
            let { desPathUpload, discount, email } = req.body;
            if (discount) {
                desPathUpload = '/product';
            }
            if (email) {
                desPathUpload = '/user';
            }
            if (!discount && !email) {
                desPathUpload = '/brand';
            }
            if (desPathUpload) {
                cb(null, path.join(__dirname, `../store/img${desPathUpload}`)); // Using path.join() for file paths
            }
        } catch (error) {
            console.log(error);
        }
    },
    filename: function (req, file, cb) {
        cb(null, +Date.now() + file.originalname);
    },
});

// Create the Multer middleware
const uploadMiddleware = multer({ storage: storage });

module.exports = uploadMiddleware;
