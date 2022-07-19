import { createApp } from "vue";
import PersistState from "vue-persist-state";
import DatasetState from "@gormartsen/vue-dataset";
import ApiClient from "@microservice-framework/vue-api-client";
import Debug from "vue-debug";

import App from "./App.vue";
import router from "./router";

window.APP = createApp(App);

import apiSettings from "./settings/api-settings";
import defaultSettings from "./settings/state-settings";
import defaultDataSet from "./settings/dataset-settings";

var sessionName = "API-Browser-APP";

window.APP.use(Debug, true);
window.APP.use(router);
window.APP.use(PersistState, sessionName, defaultSettings);
window.APP.use(DatasetState, defaultDataSet);
window.APP.use(ApiClient, apiSettings);

window.APP.mount("#app");
