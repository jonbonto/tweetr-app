import Vue from "vue";
import VeeValidate from "vee-validate";
import axios from "axios";

import App from "./App.vue";
import router from "@/router";
import moment from "moment";

Vue.use(VeeValidate);

Vue.config.productionTip = false;
window.axios = axios;
axios.defaults.baseURL = "http://127.0.0.1:3333";

// Global filter to format dates with momentjs
Vue.filter("timeAgo", (date) => moment(date).fromNow());
Vue.filter("joined", (date) => moment(date).format("MMMM YYYY"));
Vue.filter("timeAgo", (date) => moment(date).format("MMMM Do YYYY"));

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
