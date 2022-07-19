export default {
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
}
