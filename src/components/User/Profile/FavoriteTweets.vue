<template>
  <div>
    <UserProfileHeader :user="user" :auth-user="authUser" />
    <div class="ui stackable grid container">
      <div class="four wide column">
        <UserProfileSidebarDetails :user="user" />
      </div>
      <div class="eight wide column">
        <div class="ui segment">
          <div class="ui medium dividing header">Tweets</div>

          <Tweets :tweets.sync="onlyTweets" :auth-user="authUser" />
        </div>
      </div>
      <div class="four wide column">
        <WhoToFollow v-if="isLoggedIn" />
      </div>
    </div>
  </div>
</template>

<script>
import UserProfileHeader from "@/components/User/Profile/UserProfileHeader";
import UserProfileSidebarDetails from "@/components/User/Profile/UserProfileSidebarDetails";
import profileMixin from "@/mixins/profileMixin";
import Tweets from "@/components/Tweet/Tweets";
import WhoToFollow from "@/components/User/WhoToFollow";

export default {
  name: "FavoriteTweets",
  mixins: [profileMixin],
  components: {
    UserProfileHeader,
    UserProfileSidebarDetails,
    Tweets,
    WhoToFollow,
  },
  data() {
    return {
      user: "",
      authUser: "",
    };
  },
  computed: {
    isLoggedIn() {
      return !!this.authUser;
    },
    onlyTweets() {
      return Array.from(
        this.user.favorites,
        (favorite) => favorite.tweet
      ).reverse();
    },
  },
};
</script>
