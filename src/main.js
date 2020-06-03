import Vue from "vue";
import VueRouter from "vue-router";
import VeeValidate from "vue-validate";
import axios from "axios";

import App from "./App.vue";

Vue.use(VueRouter);
Vue.use(VueValidate);

const router = new VueRouter({
  base: "/",
  mode: "history",
  routes: [{ path: "/path", component: component }],
});

Vue.config.productionTip = false;
window.axios = axios;
axios.defaults.baseURL = "http://127.0.0.1:3333";

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
