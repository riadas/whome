<template>
    <div id="unsigned-in-view">
        <div id="content-header">
            &#128172; Who's home?
        </div>
        <div id="instruction">
            Enter password for <b>DasRouter</b>:
        </div>
        <div id="password-container">
            <input v-model="password" type="password" id="pass" name="password" minlength="8" required>
            <button @click="onSubmit"> Submit </button>
        </div>
    </div>
</template>

<script>
import { eventBus } from "../main";

export default {
    name: "UnsignedInView",
    data: function() {
        return {
            password: "",
        };
    },
    methods: {
        onSubmit: function() {
            if (this.password === "bitturia") {
                eventBus.$emit("successful-sign-in");
            }
        }
    }
}
</script>

<style scoped>
    #unsigned-in-view {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    background-color: #2D9CDB;
    width: 100%;
}

#content-header {
    font-size: 68px;
    margin-top: 12%;
    color: white;
}

#id {
    color: white;
    margin-top: 10px;
}

#password-container {
    margin-top: 10px;
    width: 250px;
    display: flex;
    justify-content: space-around;
}

#pass {
    font-size: 15px;
    border-radius: 8px;
    box-shadow: none;
    border: 1px solid white;
    padding: 0 5px;
}

#pass:focus {
    outline: none;
}

#password-container button {
    border: 1px solid white;
    border-radius: 8px;
    font-size: 12px;
    outline: none;
}

#password-container button:hover {
    cursor: pointer;
}

#instruction {
    color: white;
}
</style>