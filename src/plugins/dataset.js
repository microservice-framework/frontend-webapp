import { reactive } from "vue";

function DataSetState(setDefenition) {
  this.setDefenition = setDefenition;
  var self = this;
  self.dataset = {};
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
    self.dataset[dataset] = newValue;
  }
  return self;
}

/**
 * Get Item.
 */
DataSetState.prototype.getItem = function (dataset) {
  var definition = this.setDefenition[dataset];
  var value;
  if (!definition) {
    return undefined;
  }

  if (typeof value !== "string") {
    // No data stored yet
    if (typeof definition.default !== "undefined") {
      return definition.default;
    }
    return undefined;
  }
  switch (definition.type) {
    case "boolean": {
      return value == "true";
    }
    case "number": {
      return parseInt(value);
    }
    case "float": {
      return parseFloat(value);
    }
    case "array": {
      try {
        return JSON.parse(value);
      } catch (e) {
        console.error("ARRAY: failed to parse ", value);
        return [];
      }
    }
    case "object": {
      try {
        return JSON.parse(value);
      } catch (e) {
        console.error("Object: failed to parse ", value);
        return {};
      }
    }
  }
  return value;
};

export default {
  install: (app, options) => {
    app._DataSetState = false;
    // inject a globally available $translate() method
    var datasetStorage = new VuePersistState(options);
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
