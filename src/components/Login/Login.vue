<style scoped lang="scss" src="./Login.scss"></style>
<template src="./Login.html"></template>
<script>
export default {
  data() {
    return {
      token: ''
    }
  },
  methods: {
    submitToken: function(){
      var self = this;
      var currentToken = this.token;
      var clientSettings = {
        URL: "http://ca.local:2100",
        accessToken: currentToken
      }
      var client = new MicroserviceClient(clientSettings);
      client.get('','', function(err, handlerResponse){
        if(handlerResponse.length > 0) {
          self.$sources.AccessToken = currentToken;
          self.$sources.services = handlerResponse;
          self.$sources.isLogin = true
        }
      })

      
    }
  }
}
</script>