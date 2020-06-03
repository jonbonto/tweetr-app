import Vue from "vue";
import VeeValidate from "vee-validate";
import axios from "axios";

import App from "./App.vue";
import router from "@/router";

Vue.use(VeeValidate);

Vue.config.productionTip = false;
window.axios = axios;
axios.defaults.baseURL = "http://127.0.0.1:3333";

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
