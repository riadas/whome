let ip = "73.227.95.92";
let unknownActiveDevices = [];

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = process.env.MONGOLAB_URI;    

class Database {
    /*
    static addUser(name, primary_device, secondary_devices) {
        const user = { name: name, primary_device: primary_device, secondary_devices: secondary_devices, last_seen: "Never", active: false };
        users.push(user);
    }

    static updateUser(oldName, newName, primary_device, secondary_devices) {
        const filteredUsers = user.filter((user) => {return user.name === oldName});
        if (filteredUsers.length === 1) {
            user = filteredUsers[0];
            user.name = newName;
            user.primary_device = primary_device;
            user.secondary_devices = secondary_devices;
        } else {
            return undefined;
        }
    }

    static deleteUser(name) {
        const filteredUsers = users.filter((user) => {return user.name !== name});
        if (filteredUsers.length === users.length) {
            return undefined;
        } else {
            users = filteredUsers;
            return filteredUsers;
        }
    }

    static findUser(name) {
        const filteredUsers = users.filter((user) => { return user.name === name });
        if (filteredUsers.length === 0) {
            return filteredUsers[0];
        } else {
            return undefined;
        }
    }

    static findAllUsers() {
        return users;
    }
    */

    //static async findActives() {
        
        
    //}

    static async updateActives(activeDevices) {
        let users = [];
        await MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("whome");
            var query = {};
            dbo.collection("users").find(query).toArray(function(err, result) {
                if (err) throw err;
                console.log(result);
                users = result;

                for (const user of users) {
                    let query = { name: user.name };
                    let newValues;
                    if (activeDevices.includes(user.primary_device)) {
                        newValues = { $set: { last_seen: new Date(), active: true } };            
                    } else {
                        newValues = { $set: { last_seen: new Date(), active: false } };
                    }
                    
                    MongoClient.connect(url, function(err, db) {
                        if (err) throw err;
                        var dbo = db.db("whome");
                        dbo.collection("users").updateOne(query, newValues, function(err, res) {
                            if (err) throw err;
                            console.log("1 document updated");
                            db.close();
                        });
                    });
                }
                
                unknownActiveDevices = [];
                for (const device of activeDevices) {
                    const usersWithDevice = users.filter((user) => {return (user.primary_device === device || user.secondary_devices.includes(device))});
                    if (usersWithDevice.length == 0) {
                        unknownActiveDevices.push(device);
                    }
                }
                unknownActiveDevices = Array.from(new Set(unknownActiveDevices));
                db.close();
                return users;
            });
        });
    }

    static getUnknownActiveDevices() {
        return unknownActiveDevices;
    }

    static getIP() {
        return ip;
    }

    static setIP(new_ip) {
        ip = new_ip;
        
        return ip;
    }

}

module.exports = Database;