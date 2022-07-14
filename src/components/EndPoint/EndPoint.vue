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
    selectItem: function(method) {
      this.$sources.service = this.EndPoint;
      this.$sources.service.method = method;
      return false;
    }
  },
};
</script>
