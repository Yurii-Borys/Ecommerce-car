const multer = require('multer');
const path = require('path');
const Cars = require('../models/carsModel');

const storage = multer.diskStorage({
    destination: `./assets/`,
    filename: function (req, file, cb) {
        if (!req?.body?.model || !req?.body?.price || !req?.body?.quantity || !req?.body?.description || !file) {
            return cb(new Error('All field are required'), false);
        }
        (async function dublicateModel() {
            const model = req?.body?.model;
            const res = await Cars.findOne({ model: model })
            if (res) {
                return cb(new Error('User exist!'), false);
            }
            return cb(null, path.parse(`${file.originalname}`).name + '-' + Date.now() + path.extname(file.originalname))

        })();
    }
})
const imageFilter = function (req, file, cb) {
    const { model, price, quantity, description } = req.body;
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

const upload = multer({
    storage,
    fileFilter: imageFilter
}).single('imageUrl');

module.exports = { upload };