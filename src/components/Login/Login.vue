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
      console.log("1", this.$sources, this.token);
      var self = this;
      var currentToken = this.token;
      var clientSettings = {
        URL: "http://ca.local:2100",
        accessToken: currentToken
      }
      var client = new MicroserviceClient(clientSettings);
      client.get('','', function(err, handlerResponse){
         console.log("2.1",err, handlerResponse);
        if(handlerResponse.length > 0) {
          console.log("2", self.$sources, self.token);
          self.$sources.AccessToken = currentToken;
          self.$sources.services = handlerResponse;
          self.$sources.isLogin = true
        }
      })

      
    }
  }
}
</script>