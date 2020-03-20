<template>
    <div id="signed-in-view">
        <div id="mini-panel">
            <b-tabs pills content-class="mt-3" justified>
                <b-tab active>
                    <template v-slot:title>
                        <b-spinner type="grow" small></b-spinner> Current Status 🏠
                    </template>
                    <div class="tabbed-content">
                        
                        <ActivityView />
                    </div>
                </b-tab>
                <b-tab title="History 📜">
                    <div class="tabbed-content">Coming soon!</div>
                </b-tab>
                <b-tab title="Manage Profiles 🙋‍">
                    <div class="tabbed-content">Coming soon!</div>
                </b-tab>
            </b-tabs>
        </div>
    </div>
</template>

<script>
import ActivityView from "./ActivityView";

export default {
    name: "SignedInView",
    components: {
        ActivityView,
    }
}
</script>

<style scoped>

#signed-in-view {
    display: flex;
    justify-content: center;
    height: 100%;
    background-color: transparent;
}

#mini-panel {
    margin-top: 5%;
    width: 60%;
    min-width: 650px;
    display: flex;
    justify-content: center;
}

.tabbed-content {
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    padding-top: 30px;
    border-top: 1px solid white;
    margin-top: -10px;
}

.tabs {
    background-color: #2D9CDB;
    border-radius: 8px;
    height: 400px;
    width: 100%;
    color: black;
}


.nav-pills .nav-link {
    color: white;
    margin: 0px 5px;
    border-radius: 8px;
}

a {
    color: white;
}

</style>