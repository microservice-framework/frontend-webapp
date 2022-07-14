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
    "EndPoint.method"(newValue) {
      this.url = this.EndPoint.path;
      if(['PUT', 'DELETE', 'GET'].indexOf(this.EndPoint.method) !== -1) {
        this.url = this.url + '/:' + this.EndPoint.options.id.title
      }
    }
  },
  computed: {
    "isShowTokenField": function(){
      if(['PUT', 'DELETE', 'GET'].indexOf(this.EndPoint.method) == -1) {
        return false;
      }
      if(this.EndPoint.secureKey) {
        return true;
      }
      return false;
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
      if('SEARCH' == this.EndPoint.method) {
        this.requestBody = '{\n "query":{},\n "limit":10\n}';
      }
      if('POST' == this.EndPoint.method) {
        var parseProperty = function(property) {
          var returnValue = false;
          switch(property.type) {
            case 'number':
            case 'boolean':
            case 'string': {
                returnValue = '' + property.type.toUpperCase() + ': ';
                if(property.required) {
                  returnValue = returnValue + '[required] ';
                }
                return returnValue + property.description;
                break;
              }
            case 'object': {
              returnValue = {};
              if(property.properties) {
                for(var name in property.properties) {
                  var value = parseProperty(property.properties[name]);
                  if(value !== false) {
                    returnValue[name] = value;
                  }
                }
                return returnValue;
              }
              if(property.required) {
                return returnValue;
              }
              return false;
            }
            case 'array': {
              returnValue = [];
              var item = parseProperty(property.items);
              if(item !== false) {
                returnValue.push(item);
              }
              return returnValue;
            }
          }
        }
        var postObject = {};
        for(var name in this.EndPoint.options.properties) {
          if(name == 'created' || name == 'changed') {
            continue;
          }
          var property = parseProperty( this.EndPoint.options.properties[name]);
          if(property !== false) {
            postObject[name] = property
          }
        }
        try{
          this.requestBody = JSON.stringify(postObject, null, 2)
        } catch(e) {
          this.requestBody = JSON.stringify(e, null, 2)
        }
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
          client.post(self.url, data, function(err, handlerResponse){
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
