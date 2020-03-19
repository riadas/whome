let users = [{ name: "Ria Das", 
               primary_device: "F8:87:F1:1B:CC:16",
               secondary_devices: ["a4:83:e7:66:60:d0".toUpperCase(), ],
               last_seen: "Never",
               active: false,
            },
            { name: "Raj Das", 
               primary_device: "B8:C1:11:EA:9A:A8",
               secondary_devices: ["F8:FF:C2:67:50:D0", "10:AE:60:40:64:3F"],
               last_seen: "Never",
               active: false,
            },
            { name: "Anindita Das", 
               primary_device: "BC:9F:EF:A7:A0:25",
               secondary_devices: [],
               last_seen: "Never",
               active: false,
            },

            { name: "Souripriya Das", 
               primary_device: "B8:44:D9:AB:E3:20",
               secondary_devices: ["F8:87:F1:1B:CC:16", "34:64:A9:63:3B:6D", "F0:18:98:53:35:61", "44:03:2C:71:13:2B"],
               last_seen: "Never",
               active: false,
            },
            ];
let unknownActiveDevices = [];
let ip = "73.227.95.92";

class Database {

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

    static findActives() {
        const active_statuses = [];
        const current_date = new Date();
        for (const user of users) {
            //console.log("current user:")
            //console.log(JSON.stringify(user));
            if (user.active) {
                active_statuses.push({ name: user.name, last_seen: "Active"});
            } else {
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
        return { active_statuses: active_statuses, unknown_devices: unknownActiveDevices};
    }

    static updateActives(activeDevices) {
        for (const user of users) {
            if (activeDevices.includes(user.primary_device)) {
                user.last_seen = new Date();
                user.active = true;
            } else {
                user.active = false;
            }
        }
        
        unknownActiveDevices = [];
        for (const device of activeDevices) {
            const usersWithDevice = users.filter((user) => {return (user.primary_device === device || user.secondary_devices.includes(device))});
            if (usersWithDevice.length == 0) {
                unknownActiveDevices.push(device);
            }
        }
        unknownActiveDevices = Array.from(new Set(unknownActiveDevices));
        return users;
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