<script setup lang="ts">
</script>

<template>
  <div class="app">
    <suspense>
      <NuxtPage/>
    </suspense>
  </div>
</template>

<style lang="scss">
@import '@coreui/coreui/dist/css/coreui.min.css';
@import 'vue3-toastify/dist/index.css';
@import 'assets/styles/transitions';

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
  color: inherit;
}

.app {
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
}
</style>