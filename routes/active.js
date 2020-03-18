const express = require('express');

const Database = require('../models/Database');

const router = express.Router();

const cheerio = require("cheerio");
const axios = require("axios");

/* POST current addresses */
router.post('/', async function(req, res) {
    const ip = Database.getIP();
    try {
        const deployment_ip = await axios.get("http://api.ipify.org/");
        console.log("deployment_ip: " + deployment_ip.data);
        let result;
        if (deployment_ip.data === ip) {
            result = await axios.get("http://10.0.0.1");
        } else {
            result = await axios.get("http://" + ip + ":8000");
        }
        
        const $ = cheerio.load(result.data);
        const activeDevices = [];

        $(".readonlyLabel").each((index, element) => {
            const text = $(element).text();
            if (text.split(":").length == 6) {
            activeDevices.push(text.toUpperCase());    
            }
        });
        
        const updatedData = Database.updateActives(activeDevices);
        res.status(200).json(activeDevices).end();
    } catch (err) {
        console.log(err);
        res.status(400).json(err).end();
    }
});

/* GET activity statuses */
router.get('/', (req, res) => {
    const data = Database.findActives();
    console.log("GET response data: "+JSON.stringify(data));
    res.status(200).json(data).end();
});

module.exports = router;