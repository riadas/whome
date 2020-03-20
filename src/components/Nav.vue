<template>
    <div class="nav">
        <div id="title">
            <h2>&#127968; whome</h2>
        </div>
        <div id="about">
            <h2 @click="onAboutClick">about</h2>
        </div>
    </div>
</template>

<script>

export default {
    name: "Nav",
    methods: {
        onAboutClick: function() {
            console.log("clicked About!");
        }    
    }
}
</script>

<style scoped>

.nav {
   display: flex;
   flex-direction: row;
   align-items: stretch;
   justify-content: space-between;
   width: 100%;
   height: 65px; 
   background-color: black;
   color: white;
   padding: 0 20px;
}
.nav h2 {
    margin: 0;
}
#title, #about {
    display: flex;
    align-items: center;
}

#about h2 {
    font-size: medium;
    font-weight: initial;
}

#title h2 {
    font-weight: initial;
}

#about h2:hover {
    font-weight: 550;
    cursor: default;
}

#title h2:hover {
    cursor: default;
}


</style>