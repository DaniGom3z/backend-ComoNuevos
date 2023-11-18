const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);    }
});

const upload = multer({ storage });

exports.upload = upload.fields([
    { name: 'imagenFrontal', maxCount: 1 },
    { name: 'imagenInterior', maxCount: 1 },
    { name: 'imagenLateral', maxCount: 1 }
]);