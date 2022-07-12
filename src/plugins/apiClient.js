function getWatch(){
  return {
    '$api.client':  function(newValue, oldValue) {
      //global.debug.log('$api.client');
      if (newValue) {
        if (this.$api.online === false || oldValue == false) {
          //global.debug.log('apiClient registered', newValue, oldValue);
          this.$api.online = true;
        }
        return 
      }
      //global.debug.log('apiClient removed', newValue);
      return this.$api.online = false;
    },
    '$state.accessToken': function(newValue) {
      this.$api.client = new MicroserviceClient({
        URL: apiSettings.apiURL,
        accessToken: newValue
      });
    },
    '$state.expireAt': function(newValue, oldValue) {
      if (newValue == 0) {
        this.$api.client = false;
        return
      }
      if(newValue < oldValue) {
        return;
      }
      if (this.$api.timerApiClient) {
        clearTimeout(this.$api.timerApiClient);
      }
      var self = this;
      var period = newValue - Date.now();
      if (period > 0 && !isNaN(period)){
        //global.debug.log('apiClientToken expire in ', period);
        this.$api.timerApiClient = setTimeout(function(){
          //global.debug.log('apiClientToken:expired');
          self.$state.expireAt = 0;
        }, period);
      }
    }
  }
}

import { reactive } from "vue";

export default {
  install: (app, options) => {
    var api = {
      online: false,
      client: false,
      timerApiClient: false,
      url: apiSettings.apiURL,
    }
    app._APIState= false
    // inject a globally available $translate() method
    app.config.globalProperties['$api'] = reactive(api)
    app.mixin({
      created: function beforeCreate () {
        if(!app._APIState) {
          app._APIState = true;
          app.$api = this.$api;
          var watchers = getWatch();
          for(var name in watchers) {
            this.$watch(name, watchers[name]);
          }
          if(this.$state.accessToken) {
            this.$api.client = new MicroserviceClient({
              URL: apiSettings.apiURL,
              accessToken: this.$state.accessToken
            });
          }
        }
      }
    });
  }
}
