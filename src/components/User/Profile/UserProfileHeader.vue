<template>
  <div class="ui segment">
    <div class="ui grid container">
      <div class="four wide column">
        <img
          src="https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm"
          alt=""
          class="ui tiny avatar image"
        />
      </div>
      <div class="bottom aligned twelve wide column">
        <div class="ui horizontal relaxed link list">
          <div class="item">
            <div class="content">
              <router-link :to="`/${user.username}`">
                <div class="header">Tweets</div>
                <strong>{{ user.tweets.length }}</strong>
              </router-link>
            </div>
          </div>
          <div class="item">
            <div class="content">
              <router-link
                :to="isOwner ? `/followers` : `/${user.username}/followers`"
              >
                <div class="header">Followers</div>
                <strong>{{ user.followers.length }}</strong>
              </router-link>
            </div>
          </div>
          <div class="item">
            <div class="content">
              <router-link
                :to="isOwner ? `/favorites` : `/${user.username}/favorites`"
              >
                <div class="header">Favories</div>
                <strong>{{ user.favorites.length }}</strong>
              </router-link>
            </div>
          </div>
        </div>
        <div class="ui right floated horizontal list" v-if="isOwner">
          <router-link to="/settings/profile" class="ui button primary"
            >Edit Profile</router-link
          >
        </div>
        <div
          class="ui right floated horizontal list"
          v-if="isLoggedIn && !isOwner"
        >
          <button
            class="ui tiny button primary"
            v-if="isFollowing"
            @click="unfollow(user.id)"
          >
            Unfollow
          </button>
          <button
            class="ui tiny button primary"
            v-else
            @click="follow(user.id)"
          >
            Follow
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserProfileHeader",
  props: {
    user: {
      type: Object,
      required: true,
    },
    authUser: {
      type: Object,
    },
  },
  computed: {
    isOwner() {
      return this.user.id === this.authUser.id;
    },
    isLoggedIn() {
      return !!this.authUser;
    },
    isFollowing() {
      for (const following of this.authUser.following) {
        if (following.id === this.user.id) {
          return true;
        }
      }
      return false;
    },
  },
  methods: {
    follow(id) {
      const token = localStorage.getItem("tweetr-token");

      axios
        .post(
          "/users/follow",
          { user_id: id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          this.authUser.following.push({ id });
        });
    },

    unfollow(id) {
      const token = localStorage.getItem("tweetr-token");

      axios
        .delete(`/users/unfollow/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.authUser.following = this.authUser.following.filter(
            (following) => following.id !== id
          );
        });
    },
  },
};
</script>
