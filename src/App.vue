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
        this.$sources.isLogin = false;
        this.$sources.services = [];
      }
    },
    "$api.client": function (newValue) {
      if (newValue) {
        var self = this;
        this.$dataset.services.refresh();
        self.$sources.isLogin = true;
      }
    },
  },
  mounted() {},
};
</script>
