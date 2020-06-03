<template>
  <div class="meta">
    <a class="reply">
      <i class="reply icon"> </i>
      {{ replies.length }}
    </a>
    <a class="like" v-if="isFavoritedByUser" @click="unfavoriteTweet">
      <i class="like red icon"></i> {{ favorites.length }}
    </a>
    <a class="like" v-else @click="favoriteTweet">
      <i class="like icon"></i> {{ favorites.length }}
    </a>
  </div>
</template>

<script>
export default {
  name: "TweetReactions",
  props: {
    tweet: {
      type: Object,
      required: true,
    },
    authUser: {
      type: Object,
      required: true,
    },
    replies: {
      type: Array,
      required: true,
    },
    favorites: {
      type: Array,
      required: true,
    },
  },

  computed: {
    isFavoritedByUser() {
      return this.favorites.some((fav) => fav.user_id === this.authUser.id);
    },
  },

  methods: {
    favoriteTweet() {
      const token = localStorage.getItem("tweetr-token");

      if (!token) {
        alert("You must be logged in to perform the action.");
        return;
      }

      axios
        .post(
          "/favorites/create",
          { tweet_id: this.tweet.id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          this.favorites.push(response.data.data);
        });
    },

    unfavoriteTweet() {
      const token = localStorage.getItem("tweetr-token");

      if (!token) {
        alert("You must be logged in to perform the action.");
        return;
      }

      axios
        .delete(`/favorites/destroy/${this.tweet.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const favorites = this.favorites.filter(
            (fav) => fav.user_id !== this.authUser.id
          );

          this.$emit("update:favorites", favorites);
        });
    },
  },
};
</script>
