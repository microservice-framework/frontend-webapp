<style scoped lang="scss" src="./EndPoint.scss"></style>
<template src="./EndPoint.html"></template>
<script setup>
defineProps({
  EndPoint: {
    required: true,
  },
});
</script>
<script>
export default {
  data() {
    return {
      token: "",
    };
  },
  methods: {
    selectItem: function (method) {
      this.$state.service = this.EndPoint;
      this.$state.service.method = method;
      return false;
    },
  },
};
</script>
