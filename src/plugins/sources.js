import { reactive } from "vue";

export default {
  install: (app, options) => {
    // inject a globally available $translate() method
    app.config.globalProperties['$sources'] = reactive(options)
  }
}
