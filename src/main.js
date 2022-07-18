import { createApp } from "vue";
import PersistState from "vue-persist-state";
import DatasetState from "@gormartsen/vue-dataset";
import ApiClient from "./plugins/apiClient";

import App from "./App.vue";
import router from "./router";

window.APP = createApp(App);

var apiSettings = {
  apiURL: "http://ca.local:2100",
  methods: [
    {
      name: "printSelf",
      function: function () {
        console.log(this);
      },
    },
  ],
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
  service: {
    type: "object",
    default: {},
    persist: false,
  },
  isLogin: {
    type: "boolean",
    default: false,
    persist: false,
  },
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

window.APP.use(router);
window.APP.use(PersistState, sessionName, defaultSettings);
window.APP.use(DatasetState, defaultDataSet);
window.APP.use(ApiClient, apiSettings);

window.APP.mount("#app");
