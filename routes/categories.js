var express = require("express");
const { store, index, update, destroy, show } = require("../controllers/categoryController");
var router = express.Router();
const { body } = require('express-validator');


router.post("/",
    body('name').isLength({ min: 2, max: 20 }),
    body('description').isLength({ min: 2, max: 20 }),
    store
);
router.get("/", index);
router.put("/:id", update);
router.delete("/:id", destroy);
router.get('/:id', show);

module.exports = router;