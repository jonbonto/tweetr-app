<template>
  <div class="ui stackable three column centered grid container">
    <div class="column">
      <h2 class="ui dividing header">Log In</h2>

      <Notification
        :message="notification.message"
        :type="notification.type"
        v-if="notification.message"
      />

      <form class="ui form" @submit.prevent="login">
        <div class="field" :class="{ error: errors.has('email') }">
          <label>Email</label>
          <input
            type="email"
            name="email"
            :class="{ input: true, 'is-danger': errors.has('email') }"
            v-model="email"
            v-validate="'required|email'"
            placeholder="Email"
          />
          <span v-show="errors.has('email')" class="is-danger">{{
            errors.first("email")
          }}</span>
        </div>

        <div class="field" :class="{ error: errors.has('password') }">
          <label>Password</label>
          <input
            type="password"
            name="password"
            :class="{ input: true, 'is-danger': errors.has('password') }"
            v-model="password"
            v-validate="'required'"
            placeholder="Password"
          />
          <span v-show="errors.has('password')" class="is-danger">{{
            errors.first("password")
          }}</span>
        </div>

        <button class="fluid ui primary button" :disabled="!isFormValid">
          Login
        </button>

        <div class="ui hidden divider"></div>
      </form>

      <div class="ui divider"></div>

      <div class="ui column grid">
        <div class="center aligned column">
          <p>
            Don't have an account ?
            <router-link to="/signup">Sign Up</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Notification from "@/components/Notification";

export default {
  name: "LoginForm",
  components: {
    Notification,
  },
  data() {
    return {
      email: "",
      password: "",
      notification: {
        message: "",
        type: "",
      },
    };
  },
  computed: {
    isFormValid() {
      return Object.keys(this.fields).every((key) => this.fields[key].valid);
    },
  },
  beforeRouteEnter(to, from, next) {
    const token = localStorage.getItem("tweetr-token");

    return token ? next("/") : next();
  },
  methods: {
    login() {
      axios
        .post("/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          localStorage.setItem("tweetr-token", response.data.data.token);

          // redirect to user home
          this.$router.push("/");
        })
        .catch((error) => {
          // clear form inputs
          this.email = this.password = "";

          this.notification = Object.assign({}, this.notification, {
            message: error.response.data.message,
            type: error.response.data.status,
          });
        });
    },
  },
};
</script>

<style></style>
