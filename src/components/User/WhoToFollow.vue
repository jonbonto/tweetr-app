<template>
  <div class="ui segment">
    <h2 class="ui medium dividing header">Who to follow</h2>
    <i class="refresh link icon" @click="fetchWhoToFollow"></i>

    <div class="ui divided link items custom">
      <div class="item" v-for="user in usersToFollow" :key="user.id">
        <div class="ui avatar image">
          <img src="https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm" />
        </div>
        <div class="content">
          <router-link class="ui small header" :to="`/${user.username}`">
            {{ user.name }} <small>{{ `@${user.username}` }}</small>
          </router-link>

          <div class="meta">
            <button
              class="ui compact button mini primary"
              @click="followUser(user.id)"
            >
              Follow
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WhoToFollow",
  data() {
    return {
      usersToFollow: [],
    };
  },
  created() {
    this.fetchWhoToFollow();
  },
  methods: {
    fetchWhoToFollow() {
      const token = localStorage.getItem("tweetr-token");

      axios
        .get("/users/users_to_follow", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.usersToFollow = response.data.data;
        });
    },
    followUser(userId) {
      const token = localStorage.getItem("tweetr-token");

      axios
        .post(
          "/users/follow",
          { user_id: userId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          this.usersToFollow = this.usersToFollow.filter(
            (user) => user.id !== userId
          );
        });
    },
  },
};
</script>

<style scoped>
@media only screen and (max-width: 767px) {
  .ui.items:not(.unstackable) > .item > .image.avatar {
    width: 2em !important;
    margin: 0;
  }
  .ui.items:not(.unstackable) > .item > .image.avatar + .content {
    padding-left: 1.5em;
    padding-top: 0;
  }
  .ui.items.custom:not(.unstackable) > .item {
    flex-direction: row;
  }
}
</style>
