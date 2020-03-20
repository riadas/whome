const express = require('express');

const Database = require('../models/Database');

const router = express.Router();

const cheerio = require("cheerio");
const axios = require("axios");

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = process.env.MONGOLAB_URI; 

/* POST current addresses */
router.post('/', async function(req, res) {
    const ip = Database.getIP();
    try {
        const deployment_ip = await axios.get("http://api.ipify.org/");
        console.log("deployment_ip: " + deployment_ip.data);
        console.log("home network ip: "+ip);
        let result;
        if (deployment_ip.data === ip) {
            result = await axios.get("http://10.0.0.1");
        } else {
            result = await axios.get("http://" + ip + ":8000/");
        }
        
        const $ = cheerio.load(result.data);
        console.log("html: "+$.html());
        let activeDevices = [];

        $(".readonlyLabel").each((index, element) => {
            const text = $(element).text();
            if (text.split(":").length == 6) {
            activeDevices.push(text.toUpperCase());    
            }
        });
        console.log("activeDevices: "+activeDevices);
        const updatedData = await Database.updateActives(activeDevices);
        console.log("updatedData: "+updatedData);
        res.status(200).json(updatedData).end();
    } catch (err) {
        console.log(err);
        res.status(400).json(err).end();
    }
});

/* GET activity statuses */
router.get('/', async function(req, res) {

    console.log("FIND_ACTIVES");
    let users = [];
    const active_statuses = [];
    
    await MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("whome");
        var query = {};
        dbo.collection("users").find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log("RESULT");
            console.log(result);
            users = result;
            console.log("USERS: "+users);
            const current_date = new Date();
            for (const user of users) {
                console.log("current user:")
                console.log(JSON.stringify(user));
                if (user.active) {
                    console.log("user is active!");
                    active_statuses.push({ name: user.name, last_seen: "Active"});
                } else {
                    console.log("user is not active!");
                    if (user.last_seen === "Never") {
                        active_statuses.push({
                            name: user.name, last_seen: user.last_seen,
                        });
                    } else {
                        console.log("current_date: "+current_date.getTime());
                        console.log("user.last_seen: "+user.last_seen.getTime());
                        let time_diff = Math.round((current_date.getTime() - user.last_seen.getTime())/1000);
                        console.log("time_diff: "+time_diff);
                        let units = "seconds";
                        if (time_diff >= 60 && units === "seconds") {
                            time_diff = Math.round(time_diff/60);
                            units = "minutes";
                        }
                        
                        if (time_diff >= 60 && units === "minutes") {
                            time_diff = Math.round(time_diff/60);
                            units = "hours";
                        }
        
                        if (time_diff >= 24 && units === "hours") {
                            time_diff = Math.round(time_diff/24);
                            units = "days";
                        }
        
                        if (time_diff >= 365 && units === "days") {
                            time_diff = Math.round(time_diff/365);
                            units = "years";
                        }
        
                        active_statuses.push({
                            name: user.name, last_seen: "Last seen " + time_diff + " " + units + " ago",
                        });
                    }
                }
            }
            data = {active_statuses: active_statuses, unknown_devices: Database.getUnknownActiveDevices()};
            console.log("GET response data: "+JSON.stringify(data));
            res.status(200).json(data).end();            
            db.close();
        });
    });
    //const data = await Database.findActives();
    
});

module.exports = router;