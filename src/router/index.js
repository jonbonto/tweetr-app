import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/components/Home";
import SignupForm from "@/components/Auth/SignupForm";
import LoginForm from "@/components/Auth/LoginForm";
import UserProfileSettings from "@/components/User/Settings/UserProfileSettings";
import UserPasswordSettings from "@/components/User/Settings/UserPasswordSettings";
import UserProfile from "@/components/User/Profile/UserProfile";
import UsersFollowing from "@/components/User/Profile/UsersFollowing";
import UserFollowers from "@/components/User/Profile/UserFollowers";
import FavoriteTweets from "@/components/User/Profile/FavoriteTweets";
import SingleTweet from "@/components/Tweet/SingleTweet";

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
    { path: "/:username/status/:id", component: SingleTweet, props: true },
    { path: "/followers", component: UserFollowers },
    { path: "/:username/followers", component: UserFollowers, props: true },
    { path: "/following", component: UsersFollowing },
    { path: "/:username/following", component: UsersFollowing, props: true },
    {
      path: "/favorites",
      component: FavoriteTweets,
    },
    {
      path: "/:username/favorites",
      component: FavoriteTweets,
      props: true,
    },
    { path: "/:username", component: UserProfile, props: true },
  ],
});
