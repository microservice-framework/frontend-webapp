import { reactive } from "vue";

export default {
  install: (app, options) => {
    app._SourcesState = false;
    // inject a globally available $translate() method
    app.config.globalProperties['$sources'] = reactive(options)
    app.mixin({
      created: function beforeCreate () {
        if(!app._SourcesState) {
          app._SourcesState = true;
          app.$sources = this.$sources;
        }
      }
    })
  }
}
