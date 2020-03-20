<template>
  <div id="app">
    <Nav/>
    <ContentPanel />
  </div>
</template>

<script>
import Nav from "./components/Nav";
import ContentPanel from "./components/ContentPanel";
import axios from "axios";

export default {
  name: "app",
  components: {
    Nav,
    ContentPanel
  },
  data: function() {
      return {}
  },
  created: function() {
    axios.post('/api/actives/')
    .then(response => {
        console.log("POST /API/ACTIVES call successful");
        console.log("response: "+JSON.stringify(response));
    })
    .catch(err => {
        console.log(JSON.stringify(err));
    });
  }
};
</script>


<!-- global styles -->
<style>
* {
  box-sizing: border-box;
}

body {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: lightskyblue;
  margin: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.success-message {
  color: green;
}

.error-message {
  color: red;
}

#app {
    height: 95%;
}

</style>
