export default {
  apiURL: "http://ca.local:2100",
  methods: [
    {
      name: "printSelf",
      function: function () {
        console.log(this);
      },
    },
  ],
}
