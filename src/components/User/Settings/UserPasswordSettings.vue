<template>
  <div class="ui stackable grid container">
    <UserSettingsMenu />

    <div class="eight wide column">
      <div class="ui segment">
        <h2 class="ui dividing header">Change password</h2>

        <Notification
          :message="notification.message"
          :type="notification.type"
          v-if="notification.message"
        />

        <form class="ui form" @submit.prevent="changePassword">
          <div class="field" :class="{ error: errors.has('password') }">
            <label>Current Password</label>
            <input
              type="password"
              name="password"
              v-model="password"
              v-validate="'required'"
              placeholder="Password"
              data-vv-as="current password"
            />
            <span v-show="errors.has('password')" class="is-danger">{{
              errors.first("password")
            }}</span>
          </div>

          <div class="field" :class="{ error: errors.has('newPassword') }">
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              v-model="newPassword"
              v-validate="'required'"
              placeholder="New Password"
              data-vv-as="new password"
              ref="newPassword"
            />
            <span v-show="errors.has('newPassword')" class="is-danger">{{
              errors.first("newPassword")
            }}</span>
          </div>

          <div class="field" :class="{ error: errors.has('confirmPassword') }">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              v-model="confirmPassword"
              v-validate="'required|confirmed:newPassword'"
              placeholder="Confirm Password"
              data-vv-as="confirm password"
            />
            <span v-show="errors.has('confirmPassword')" class="is-danger">{{
              errors.first("confirmPassword")
            }}</span>
          </div>

          <button
            type="submit"
            class="ui button primary"
            :disabled="!isFormValid"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Notification from "@/components/Notification";
import UserSettingsMenu from "@/components/User/Settings/UserSettingsMenu";

export default {
  name: "UserPasswordSettings",
  components: {
    Notification,
    UserSettingsMenu,
  },
  data() {
    return {
      password: "",
      newPassword: "",
      confirmPassword: "",
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

    return token ? next() : next("/login");
  },
  methods: {
    changePassword() {
      const token = localStorage.getItem("tweetr-token");

      axios
        .put(
          "/account/change_password",
          {
            password: this.password,
            newPassword: this.newPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          this.notification = Object.assign({}, this.notification, {
            message: response.data.message,
            type: "success",
          });
        })
        .catch((error) => {
          // display error notification
          this.notification = Object.assign({}, this.notification, {
            message: error.response.data.message,
            type: "error",
          });
        })
        .finally(() => {
          // clear form inputs
          this.password = this.newPassword = this.confirmPassword = "";

          // clear form error messages
          this.$nextTick(() => {
            this.$validator.reset();
          });
        });
    },
  },
};
</script>

<style scoped></style>
