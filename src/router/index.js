import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/components/Home";
import SignupForm from "@/components/Auth/SignupForm";
import LoginForm from "@/components/Auth/LoginForm";
import UserProfileSettings from "@/components/User/Settings/UserProfileSettings";
import UserPasswordSettings from "@/components/User/Settings/UserPasswordSettings";

Vue.use(VueRouter);

export default new VueRouter({
  base: "/",
  mode: "history",
  routes: [
    { path: "/", component: Home },
    { path: "/signup", component: SignupForm },
    { path: "/login", component: LoginForm },
    { path: "/settings/profile", component: UserProfileSettings },
    { path: "/settings/password", component: UserPasswordSettings },
  ],
});
