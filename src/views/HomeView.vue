<script setup>
import EndPoint from '@/components/EndPoint/EndPoint.vue';
</script>

<template>
  <main>
    <div v-if="$sources.services.length" class="root">
      <div
        v-for="item in $sources.services"
        :key="item.path"
        class="row path">
        <EndPoint :EndPoint="item"></EndPoint>
      </div>
    </div>
    
  </main>
</template>
