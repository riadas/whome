<template>
    <div id="content-panel">
        <SignedInView v-if="signedIn" />
        <UnsignedInView v-else />
    </div>

</template>

<script>

import SignedInView from "./SignedInView";
import UnsignedInView from "./UnsignedInView";

import { eventBus } from "../main";

export default {
    name: "ContentPanel",
    components: {
        SignedInView,
        UnsignedInView,
    },
    data: function() {
        return {
            signedIn: false,
        };
    },
    created: function() {
        eventBus.$on("successful-sign-in", () => {
            this.signedIn = true;
        });
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Reenie+Beanie&display=swap');

#content-panel {
    height: 100%;
}

</style>