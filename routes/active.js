const express = require('express');

const Database = require('../models/Database');

const router = express.Router();

const cheerio = require("cheerio");

/* POST current addresses */
router.post('/', (req, res) => {
    console.log("req.body");
    console.log(req.body);
    const data = cheerio.load(req.body);
    
    const activeDevices = [];
    data(".readonlyLabel").each((index, element) => {
        const text = $(element).text();
        if (text.split(":").length == 6) {
           activeDevices.add(text.toUpperCase());    
        }
    });
    const updatedData = Database.updateActives(activeDevices);
    res.status(200).json(activeDevices).end();
});

/* GET activity statuses */
router.get('/', (req, res) => {
    const data = Database.findActives();
    console.log("GET response data: "+JSON.stringify(data));
    res.status(200).json(data).end();
});

module.exports = router;