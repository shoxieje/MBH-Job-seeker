
const express = require('express');

const router = express.Router();

const district = require("../services/district")


router.get('/', async function(req, res, next) {

    try {

        res.json(await district.retrieveDistrict());

    } catch (err) {

        console.error("Error retrieving district");
        next(err);

    }

})


router.post('/', async function(req, res, next) {

    try {

        res.json(await district.addDistrict(req.body))

    } catch (err) {

        console.error("Error while adding new district");
        next(err);

    }


})


module.exports = router;

