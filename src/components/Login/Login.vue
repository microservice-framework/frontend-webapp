<style scoped lang="scss" src="./Login.scss"></style>
<template src="./Login.html"></template>
<script setup>
defineProps({
  AccessToken: {
    required: true,
  },
});
</script>
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
        console.log(err, handlerResponse);
        if(handlerResponse.length == 0) {
          clientSettings.secureKey = currentToken;
          delete clientSettings.accessToken 
          client = new MicroserviceClient(clientSettings);
          client.get('','', function(err, handlerResponse){
            console.log(err, handlerResponse);
            if(handlerResponse.length) {
              this.AccessToken.tryToken(currentToken);
            }
          });
        } else {
          self.AccessToken.tryToken(currentToken);
          self.$sources.services = handlerResponse;
        }
      })

      
    }
  }
}
</script>