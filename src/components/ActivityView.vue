<template>
    <div id="activity-view">
        <table>
            <tr>
                <th id="name-header">Name</th>
                <th id="status-header">Status</th>
            </tr>
            <tr v-for="status in this.active_statuses" :key="status.name">
                <td> {{ status.name }} </td>
                <td v-if="status.last_seen === 'Active'"> <span class="active">{{ status.last_seen }} </span> </td>
                <td v-if="status.last_seen === 'Never'"> <span class="never"> {{status.last_seen}} </span></td>
                <td v-if="status.last_seen !== 'Never' && status.last_seen !== 'Active'"> <span class="inactive"> {{status.last_seen}} </span></td>

            </tr>
        </table>   
        <span id="unknown-header">
            <span> {{ this.unknown_devices.length }}</span>  
                Unknown Devices<span v-if="this.unknown_devices.length > 0">:</span> 
            </span>
        <div v-if="this.unknown_devices.length > 0">
            <span class="unknown" v-for="device in this.unknown_devices" :key="device">{{device}}</span>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "ActivityView",
    data: function() {
        return {
            active_statuses: [],
            unknown_devices: [],
            frontendTimer: "",
            backendTimer: "",
        }
    },
    created: function() {
        // make API call to get updated active statuses with setInterval
        this.updateActivesBackend();
        this.updateActivesFrontend();
        this.frontendTimer = setInterval(this.updateActivesFrontend, 10000);
        this.backendTimer = setInterval(this.updateActivesBackend, 30000);
    }, 
    methods: {
        updateActivesFrontend: function() {
            axios.get('/api/actives/')
            .then(response => {
                console.log("GET /API/ACTIVES call successful!");
                console.log("response: "+JSON.stringify(response));
                this.active_statuses = response.data.active_statuses;
                this.unknown_devices = response.data.unknown_devices;
            })
            .catch(err => {
                console.log(JSON.stringify(err));
                }
            );
        },
        updateActivesBackend: function() {
            axios.post('/api/actives/')
            .then(response => {
                console.log("POST /API/ACTIVES call successful");
                console.log("response: "+JSON.stringify(response));
            })
            .catch(err => {
                console.log(JSON.stringify(err));
            });
        }
    },
    beforeDestroy() {
        clearInterval(this.frontendTimer);
        clearInterval(this.backendTimer);
    }
}
</script>

<style>

#activity-view {
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

table {
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid lightgray;
  text-align: center !important;
  padding: 8px;
}

tr:nth-child(odd) {
  background-color: white;
  color: #2D9CDB;
}
tr:nth-child(even) {
  background-color: #2D9CDB;
  color: white;
}

th {
    background-color: whitesmoke;
    color: #2D9CDB;
}


span.active {
    background-color: #6FCF97;
    padding: 2px 6px;
    border-radius: 5px;
    color: darkgreen;
    font-size: small;
}

span.inactive {
    padding: 2px 6px;
    border-radius: 5px;
    color: darkred;
    background-color: #f1a375f0;
    font-size: small;
}

span.never {
    padding: 2px 6px;
    border-radius: 5px;
    color: whitesmoke;
    background-color: #b53535;
    font-size: small;
}

span.unknown {
    margin: 0 2px;
    background-color: gray;
    padding: 1px 4px;
    border-radius: 5px;
    font-size: small;
}

#unknown-header {
    font-size: small;
    margin-top: 5px;
}

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  color: #2D9CDB !important;
  font-weight: bold !important;
  background-color: white !important;
  margin: 0 20px !important;
  padding: 3px !important;
}

.nav-pills .nav-link,
.nav-pills .show > .nav-link {
  outline: none !important;
  padding: 3px !important;
}

a {
  color:white !important;
  text-decoration: none !important;
  background-color: transparent !important;
}
a:hover {
  color: #fff !important;
}

.tabs {
    background-color: transparent !important;
}

</style>