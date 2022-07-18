<style lang="scss" src="./App.scss"></style>
<template src="./App.html"></template>
<script setup>
// eslint-disable-next-line no-unused-vars
import { RouterLink, RouterView } from "vue-router";
// eslint-disable-next-line no-unused-vars
import Login from "@/components/LoginForm/LoginForm.vue";
</script>
<script>
export default {
  // Properties returned from data() become reactive state
  // and will be exposed on `this`.
  data() {
    return {
      //  AccessToken: useAppStore()
    };
  },
  watch: {
    "$state.accessToken"(newValue) {
      if (newValue == 0) {
        this.$state.isLogin = false;
        this.$dataset.services = [];
      }
    },
    "$api.client": function (newValue) {
      if (newValue) {
        this.$dataset.services.refresh();
        this.$state.isLogin = true;
      } else {
        this.$state.accessToken = "";
        this.$state.expireAt = 0;
      }
    },
  },
  mounted() {
    if (this.$state.accessToken !== 0 || this.$state.accessToken !== "") {
      this.$api.setAccessToken({
        accessToken: this.$state.accessToken,
        expireAt: this.$state.expireAt,
      });
    }
  },
};
</script>
