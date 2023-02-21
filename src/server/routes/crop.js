
const express = require('express');

const router = express.Router();

const crop = require("../services/crop")

router.get('/', async function(req, res, next) {

    try {

        res.json(await crop.retrieveCrop());

    } catch (err) {

        console.error("Error retrieving crop");
        next(err);

    }

})


router.post('/', async function(req, res, next) {

    try {

        res.json(await crop.addCrop(req.body))

    } catch (err) {

        console.error("Error while adding new crop");
        next(err);

    }


})


module.exports = router;