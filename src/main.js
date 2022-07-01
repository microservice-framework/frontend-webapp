import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

window.APP = createApp(App);

window.APP.use(createPinia());
window.APP.use(router);

window.APP.mount("#app");

//window.APP.config.globalProperties.$store = {AccessToken:false};