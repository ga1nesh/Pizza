const multer2 = require('multer');


const MIME_TYPE_MAP2 = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/jpg': 'jpg' };


const storage2 = multer2.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP2[file.mimetype];
        let error = new Error('Invalid mime type');
        if (isValid) {
            error = null;
        }
        cb(error, "images2");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(" ").join("-");
        const ext = MIME_TYPE_MAP2[file.mimetype];
        cb(null, name + "--" + Date.now() + "." + ext);
    }
})


module.exports = multer2({ storage: storage2 }).single('image2');
