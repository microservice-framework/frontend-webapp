<style scoped lang="scss" src="./Login.scss"></style>
<template src="./Login.html"></template>
<script setup>
defineProps({
  AccessToken: {
    required: true,
  },
});
</script>
<script>
export default {
  data() {
    return {
      token: ''
    }
  },
  methods: {
    submitToken: function(){
      this.AccessToken.tryToken(this.token);
    }
  }
}
</script>