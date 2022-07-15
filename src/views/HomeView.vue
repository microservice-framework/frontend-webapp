<script setup>
import EndPoint from "@/components/EndPoint/EndPoint.vue";
import EndPointForm from "@/components/EndPointForm/EndPointForm.vue";
</script>

<template>
  <main>
    <div v-if="$dataset.services.length" class="root">
      <div v-for="item in $dataset.services" :key="item.path" class="row path">
        <EndPoint v-if="item.options" :EndPoint="item"></EndPoint>
      </div>
    </div>
  </main>
  <div v-if="$sources.service && $sources.service.method">
    <EndPointForm :EndPoint="$sources.service"></EndPointForm>
  </div>
</template>
