import Vue from "vue";
import { firestorePlugin } from "vuefire"; // Allows us to have Real-Time Implementation to DB
// import internal components later...
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "./plugins/firebase.js";

Vue.config.productionTip = false;
Vue.use(firestorePlugin); // Allows us to have Real-Time Implementation to DB

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
