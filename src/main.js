import { createApp } from "vue";
//import { createPinia } from "pinia";
import SourcesBus from "./plugins/sources";
import PersistState from "./plugins/persist";

var SourceData = {
  isLogin: false,
  AccessToken: '',
  services: [],
}
import App from "./App.vue";
import router from "./router";

window.APP = createApp(App);

var sessionName = "API-Browser-APP";
var defaultSettings = {
  accessToken: {
    type: 'string',
    default: '',
  },
  expireAt: {
    type: 'number',
    default: 0,
  },
}

//window.APP.use(createPinia());
window.APP.use(router);
window.APP.use(SourcesBus, SourceData);
window.APP.use(PersistState, sessionName, defaultSettings);

window.APP.mount("#app");

//window.APP.config.globalProperties.$store = {AccessToken:false};