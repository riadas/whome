<template>
    <div id="mini-panel">
        <div class="mini-content" v-if="currTab == 'activity'">
            <ActivityView />            
        </div>
        <div class="mini-content" v-if="currTab == 'history'">
            <HistoryView />
        </div>
        <div class="mini-content" v-if="currTab == 'manage-profiles'">
            <ManageProfilesView />
        </div>        
    </div>        
</template>

<script>
import ActivityView from "./ActivityView";
import HistoryView from "./HistoryView";
import ManageProfilesView from "./ManageProfilesView";

export default {
    name: "MiniPanel",
    props: {
        currTab: String,
    }
}

</script>

<style scoped>

</style>