import Vue from 'vue'
import App from './App.vue'

export const eventBus = new Vue();

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';


Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
