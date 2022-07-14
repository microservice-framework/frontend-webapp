<style scoped lang="scss" src="./EndPointForm.scss"></style>
<template src="./EndPointForm.html"></template>
<script setup>
defineProps({
  EndPoint: {
    required: true,
  },
});
</script>
<script>
export default {
  data() {
    return {
      token: "",
      dropdown: false,
      url: "",
      requestAnswer: "",
      requestAnswerError: "",
      isProcessing: false,
      requestBody: '{\n "query":{},\n "limit":10\n}',
      recordToken: "",
    };
  },
  watch: {
    "EndPoint.path"(newValue) {
      this.url = this.EndPoint.path;
    }
  },
  mounted() {
    this.url = this.EndPoint.path;
    if(['PUT', 'DELETE', 'GET'].indexOf(this.EndPoint.method) !== -1) {
      this.url = this.url + '/:' + this.EndPoint.options.id.title
    }
    
  },
  methods: {
    toggleDropdown: function(){
      this.dropdown = !this.dropdown;
    },
    selectItem: function(method){
      this.$sources.service.method = method;
      this.dropdown = !this.dropdown;
      this.url = this.EndPoint.path;
      if(['PUT', 'DELETE', 'GET'].indexOf(this.EndPoint.method) !== -1) {
        this.url = this.EndPoint.path + '/:' + this.EndPoint.options.id.title
      }
    },
    doRequest: function(){
      var self = this;
      var data = self.requestBody;
      self.requestAnswerError = "";

      if(['POST', 'PUT', 'SEARCH'].indexOf(this.EndPoint.method) != -1){
        try{
          data = JSON.parse(self.requestBody);
        }catch(e){
          self.requestAnswerError = e;
          return;
        }
      }
      var clientSettings = {
        URL: this.$api.url,
      }
      if(self.EndPoint.secureKey) {
        clientSettings.secureKey = self.EndPoint.secureKey;
      } else {
        clientSettings.accessToken = self.$state.accessToken;
      }
      var client = new MicroserviceClient(clientSettings);
      switch(this.EndPoint.method){
        case 'POST': {
          self.isProcessing = true;
          client.post(data, function(err, handlerResponse){
            self.isProcessing = false;
            if(err){
              return self.requestAnswer = err;
            }
            self.requestAnswer = JSON.stringify(handlerResponse, null, 2);
          });

          break;
        }
        case 'GET': {
          self.isProcessing = true;
          if(self.EndPoint.secureKey){
            console.log("GET(self.EndPoint.secureKey): " +self.EndPoint.secureKey + ' ' + self.url + '/' + self.recordToken);
            return client.get(self.url, self.recordToken, function(err, handlerResponse){
              self.isProcessing = false;
              if(err){
                return self.requestAnswer = err;
              }
              self.requestAnswer = JSON.stringify(handlerResponse, null, 2);
            });
          }
          client.get(self.url, function(err, handlerResponse){
            self.isProcessing = false;
            if(err){
              return self.requestAnswer = err;
            }
            self.requestAnswer = JSON.stringify(handlerResponse, null, 2);
          });

          break;
        }
        case 'PUT': {
          self.isProcessing = true;
          if(self.EndPoint.secureKey){
            return client.put(self.url, self.recordToken, data, function(err, handlerResponse){
              self.isProcessing = false;
              if(err){
                return self.requestAnswer = err;
              }
              self.requestAnswer = JSON.stringify(handlerResponse, null, 2);
            });
          }

          client.put(self.url, data, function(err, handlerResponse){
            self.isProcessing = false;
            if(err){
              return self.requestAnswer = err;
            }
            self.requestAnswer = JSON.stringify(handlerResponse, null, 2);
          });
          break;
        }
        case 'DELETE': {
          self.isProcessing = true;
          if(self.EndPoint.secureKey){
            return client.delete(self.url, self.recordToken, function(err, handlerResponse){
              self.isProcessing = false;
              if(err){
                return self.requestAnswer = err;
              }
              self.requestAnswer = JSON.stringify(handlerResponse, null, 2);
            });
          }
          client.delete(self.url, function(err, handlerResponse){
            self.isProcessing = false;
            if(err){
              return self.requestAnswer = err;
            }
            self.requestAnswer = JSON.stringify(handlerResponse, null, 2);
          });

          break;
        }
        case 'SEARCH': {
          self.isProcessing = true;
          client.search(self.url, data, function(err, handlerResponse){
            self.isProcessing = false;
            if(err){
              return self.requestAnswer = err;
            }
            self.requestAnswer = JSON.stringify(handlerResponse, null, 2);
          });
          break;
        }
      }
    }
  },
};
</script>
