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
      var self = this;
      var currentToken = this.token;
      self.$api.testAccessToken(currentToken, function (err, answer) {
        if (!err) {
          self.$state.accessToken = currentToken;
          self.$state.isLogin = true;
          if (answer.expireAt) {
            self.$state.expireAt = answer.expireAt;
          }
        }
      });
    },
  },
};
</script>
