<style lang="scss" src="./App.scss"></style>
<template src="./App.html"></template>
<script setup>
import { RouterLink, RouterView } from "vue-router";
import Login from "@/components/LoginForm/LoginForm.vue";
//import { useAppStore } from '@/stores/app';
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
        this.$api.client.get("", "", function (err, handlerResponse) {
          console.log("2.1", err, handlerResponse);
          if (handlerResponse.length > 0) {
            console.log("2", self.$sources, self.token);
            self.$sources.information = handlerResponse.pop();
            self.$sources.services = handlerResponse;
            self.$sources.isLogin = true;
          }
        });
      }
    },
  },
  mounted() {},
};
</script>