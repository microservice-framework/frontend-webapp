import { createApp } from "vue";
//import { createPinia } from "pinia";
import SourcesBus from "./plugins/sources";
import PersistState from "./plugins/persist";
import ApiClient from "./plugins/apiClient";

var SourceData = {
  isLogin: false,
  AccessToken: "",
  services: [],
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
};

//window.APP.use(createPinia());
window.APP.use(router);
window.APP.use(SourcesBus, SourceData);
window.APP.use(PersistState, sessionName, defaultSettings);
window.APP.use(ApiClient, apiSettings);

window.APP.mount("#app");

//window.APP.config.globalProperties.$store = {AccessToken:false};
