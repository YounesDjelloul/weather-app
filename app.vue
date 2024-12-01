<script setup lang="ts">
</script>

<template>
  <div class="app">
    <NuxtPage/>
  </div>
</template>

<style lang="scss">
@import '@coreui/coreui/dist/css/coreui.min.css';
@import 'vue3-toastify/dist/index.css';
@import 'styles/transitions';

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.app {
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
}
</style>