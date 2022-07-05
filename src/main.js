import { createApp } from "vue";
import { createPinia } from "pinia";
import SourcesBus from "./plugins/sources";

var SourceData = {
  services: [],
}
import App from "./App.vue";
import router from "./router";

window.APP = createApp(App);

window.APP.use(createPinia());
window.APP.use(router);
window.APP.use(SourcesBus, SourceData);

window.APP.mount("#app");

//window.APP.config.globalProperties.$store = {AccessToken:false};