<template>
  <div id="app">
    <Nav/>
    <ContentPanel />
    <Footer/>
  </div>
</template>

<script>
import Nav from "./components/Nav";
import ContentPanel from "./components/ContentPanel";
import Footer from "./components/Footer";
import axios from "axios";

export default {
  name: "app",
  components: {
    Nav,
    ContentPanel,
    Footer,
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
// linear-gradient(180deg, #3868c1, #638bd6, #e683d6)
</script>


<!-- global styles -->
<style>
* {
  box-sizing: border-box;
}

body {
  font-family: "system-ui", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: linear-gradient(180deg, #3868c1, #638bd6, #e683d6);
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
    background: linear-gradient(180deg, #3868c1, #638bd6, #e683d6);
}

#footer {
  bottom: -10px;
}

</style>
