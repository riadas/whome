const express = require('express');

const Database = require('../models/Database');

const router = express.Router();

const cheerio = require("cheerio");

/* POST current addresses */
router.post('/', (req, res) => {
    console.log("req");
    console.log(req);
    console.log("req.body");
    console.log(req.body);
    console.log("MAYBE");
    console.log(JSON.parse(JSON.stringify(req.body)).html);
    const result = JSON.parse(JSON.stringify(req.body)).html;
    const $ = cheerio.load(result);
    
    const activeDevices = [];

    $(".readonlyLabel").each((index, element) => {
        const text = $(element).text();
        if (text.split(":").length == 6) {
           activeDevices.push(text.toUpperCase());    
        }
    });
    
    const updatedData = Database.updateActives(activeDevices);
    
    res.status(200).json(result.substring(0, 100)).end();
});

/* GET activity statuses */
router.get('/', (req, res) => {
    const data = Database.findActives();
    console.log("GET response data: "+JSON.stringify(data));
    res.status(200).json(data).end();
});

module.exports = router;