const express = require('express');

const Database = require('../models/Database');

const router = express.Router();

const cheerio = require("cheerio");

/* POST current addresses */
router.post('/', (req, res) => {
    const new_ip = req.body.ip;
    console.log("NEW_IP: "+JSON.stringify(req.body));
    const ret_val = Database.setIP(new_ip);
    res.status(200).json([new_ip]).end();
});

/* GET activity statuses */
router.get('/', (req, res) => {
    const data = Database.findActives();
    console.log("GET response data: "+JSON.stringify(data));
    res.status(200).json(data).end();
});

module.exports = router;