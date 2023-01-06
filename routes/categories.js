var express = require("express");
const { store, index, update, destroy, show } = require("../controllers/categoryController");
var router = express.Router();
const { body, checkSchema } = require('express-validator');
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split('.')
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext[ext.length - 1])
    }
})
const uploadFilter = (req, file, cb) => {
    const acceptedMimetypes = [
        'image/png',
        'image/jpg',
        'image/jpeg',
    ]
    if (acceptedMimetypes.indexOf(file.mimetype) > -1) {
        cb(null, true)
    } else {
        cb(null, false)
    }
    // cb(new Error('I don\'t have a clue!'))
}
const upload = multer({
    storage: storage,
    fileFilter: uploadFilter,
    limits: {
        fileSize: 1_000_000
    }
})

router.post("/",
    // function (req, res, next) {
    //     upload(req, res, function (err) {
    //         if (err instanceof multer.MulterError) {
    //             return res.send({
    //                 success: false,
    //                 messages: [err.message]
    //             })
    //         } else if (err) {
    //             return res.send({
    //                 success: false,
    //                 messages: ['Unknown error occurred, please try later']
    //             })
    //         }
    //     })
    //     return next()
    // },
    upload.single('icon'), // req.file
    // function(req, res, next) {
    //     if ('file' in req) { // if (req.file)
    //         return next()
    //     }
    //     return res.send({
    //         success: false,
    //         messages: ['The icon is invalid']
    //     })
    // },
    checkSchema({
        'icon': {
            custom: {
                options: (value, { req, path }) => !!req.file,
                errorMessage: 'You should upload a valid image file up to 1Mb',
            },
        },
    }),
    body('name').isLength({ min: 2, max: 20 }),
    body('description').isLength({ min: 2, max: 20 }),
    store
);
router.get("/", index);
router.put("/:id", update);
router.delete("/:id", destroy);
router.get('/:id', show);

module.exports = router;