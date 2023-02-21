const express = require('express');

const router = express.Router();

const seasonality = require("../services/seasonality")

router.get('/', async function (req, res, next) {

    try {

        res.json(await seasonality.retrieveSeasonality());

    } catch (err) {

        console.error("Error retrieving seasonality");
        next(err);

    }

})

router.post('/', async function(req, res, next) {

    try {

        res.json(await seasonality.addSeasonality(req.body))

    } catch (err) {

        console.error("Error while adding new seasonality");
        next(err);

    }


})

module.exports = router;
