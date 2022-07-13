<style scoped lang="scss" src="./LoginForm.scss"></style>
<template src="./LoginForm.html"></template>
<script>
export default {
  data() {
    return {
      token: "",
    };
  },
  methods: {
    submitToken: function () {
      console.log("1", this.$sources, this.token);
      var self = this;
      var currentToken = this.token;
      self.$api.testAccessToken(currentToken, function (err, answer) {
        if (!err) {
          self.$sources.AccessToken = currentToken;
          self.$state.accessToken = currentToken;
          self.$sources.isLogin = true;
          if (answer.expireAt) {
            self.$state.expireAt = answer.expireAt;
          }
        }
      });
    },
  },
};
</script>
