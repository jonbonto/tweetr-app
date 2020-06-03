import Vue from "vue";
import VueRouter from "vue-router";

import HelloWorld from "@/components/HelloWorld";
import SignupForm from "@/components/Auth/SignupForm";
import LoginForm from "@/components/Auth/LoginForm";

Vue.use(VueRouter);

export default new VueRouter({
  base: "/",
  mode: "history",
  routes: [
    { path: "/", component: HelloWorld },
    { path: "/signup", component: SignupForm },
    { path: "/login", component: LoginForm },
  ],
});
