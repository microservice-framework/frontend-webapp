import { reactive } from "vue";

function DataSetState(app, setDefenition) {
  this.setDefenition = setDefenition;
  this.app = app;
  var self = this;
  self._dataset = {};
  
  for (var dataset in this.setDefenition) {
    var newValue = self.getItem(dataset);
    var definition = self.setDefenition[dataset];
    switch (definition.type) {
      case "array":
      case "object": {
        for (var i in definition.default) {
          if (!newValue[i]) {
            newValue[i] = definition.default[i];
          }
        }
        break;
      }
    }
    var _refresh = function(){
      if(definition.provider) {
        //var _self = this;
        definition.provider(self.app, function(update){
          //_self.value = update;
          self.app['$dataset'][dataset] = reactive(update);
          self._dataset[dataset]['refresh'] = _refresh;
        })
      }
    }
    self._dataset[dataset] = reactive(newValue);
    self._dataset[dataset]['refresh'] = _refresh
  }
  this.dataset = new Proxy(this._dataset, {
    set: function(obj, prop, value) {
      var definition = self.setDefenition[prop];
      var _refresh = function(){
        if(definition.provider) {
          //var _self = this;
          definition.provider(self.app, function(update){
            self.app['$dataset'][prop] = reactive(update);
            self._dataset[prop]['refresh'] = _refresh;
          })
        }
      }
      obj[prop] = reactive(value);
      obj[prop]['refresh'] = _refresh;
      return true;
    }
  })
  return self;
}

DataSetState.prototype.refresh = function (dataset) {
  var definition = this.setDefenition[dataset];
  var self = this;
  if(definition.provider) {
    var _refresh = function(){
      if(definition.provider) {
        //var _self = this;
        definition.provider(self.app, function(update){
          //_self.value = update;
          self.app['$dataset'][dataset] = reactive(update);
          self._dataset[dataset]['refresh'] = _refresh;
        })
      }
    }
    definition.provider(self.app, function(update){
      self.app['$dataset'][dataset] = update;
      self._dataset[dataset]['refresh'] = _refresh;
    })
    return true;
  }
  return false;
}

/**
 * Get Item.
 */
DataSetState.prototype.getItem = function (dataset) {
  var definition = this.setDefenition[dataset];
  var self = this;
  var defaultValue

  if (typeof definition.default !== "undefined") {
    defaultValue = definition.default;
  } else {
    switch (definition.type) {
      case "boolean": {
        defaultValue = false;
        break;
      }
      case "number": {
        defaultValue = 0;
        break;
      }
      case "float": {
        defaultValue = 0.0;
        break;
      }
      case "array": {
        defaultValue = [];
        break;
      }
      case "object": {
        defaultValue = {};
        break;
      }
    }
  }
  return defaultValue;
}

export default {
  install: (app, options) => {
    app._DataSetState = false;
    // inject a globally available $translate() method
    var datasetStorage = new DataSetState(app, options);
    app.config.globalProperties["$dataset"] = reactive(datasetStorage.dataset);
    app.mixin({
      created: function beforeCreate() {
        if (!app._DataSetState) {
          app._DataSetState = true;
          app.$dataset = this.$dataset;
        }
      },
    });
  },
};
