import { createApp } from "vue";
//import { createPinia } from "pinia";
import SourcesBus from "./plugins/sources";
import PersistState from "vue-persist-state";
import DatasetState from "@gormartsen/vue-dataset";
import ApiClient from "./plugins/apiClient";

var SourceData = {
  isLogin: false,
  AccessToken: "",
  services: [],
  information: {},
  service: {},
};
import App from "./App.vue";
import router from "./router";

window.APP = createApp(App);

var apiSettings = {
  apiURL: "http://ca.local:2100",
};

var sessionName = "API-Browser-APP";
var defaultSettings = {
  accessToken: {
    type: "string",
    default: "",
  },
  expireAt: {
    type: "number",
    default: 0,
  },
  testing: {
    type: "string",
    default: "testing",
    persist: false,
  }
};

var defaultDataSet = {
  information: {
    type: "object",
    default: {
      name: "API browser",
      description: "",
      version: "unknown",
    },
    provider: function (app, callback) {
      app.$api.client.get("", "", function (err, handlerResponse) {
        if (handlerResponse.length > 0) {
          var information = handlerResponse.pop();
          callback(information);
        }
      });
    },
  },
  services: {
    type: "array",
    default: [],
    provider: function (app, callback) {
      app.$api.client.get("", "", function (err, handlerResponse) {
        if (handlerResponse.length > 0) {
          app.$dataset.information = handlerResponse.pop();
          callback(handlerResponse);
        }
      });
    },
  },
};

//window.APP.use(createPinia());
window.APP.use(router);
window.APP.use(SourcesBus, SourceData);
window.APP.use(PersistState, sessionName, defaultSettings);
window.APP.use(DatasetState, defaultDataSet);
window.APP.use(ApiClient, apiSettings);

window.APP.mount("#app");
