<script setup lang="ts">
</script>

<template>
  <div class="app">
    <NuxtPage/>
  </div>
</template>

<style lang="scss">
@import '@coreui/coreui/dist/css/coreui.min.css';

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

.page-enter-active,
.page-leave-active {
  transition: all 0.4s ease-out;
}

.page-enter-from {
  opacity: 0;
  transform: scale(0.98);
}

.page-leave-to {
  opacity: 0;
  transform: scale(1.02);
}

.scale-fade-enter-active, .scale-fade-leave-active {
  transition: opacity 0.4s ease, transform 0.3s ease;
}

.scale-fade-enter-from {
  opacity: 0;
  transform: scaleY(0);
}

.scale-fade-enter-to {
  opacity: 1;
  transform: scaleY(1);
}

.scale-fade-leave-from {
  opacity: 1;
  transform: scaleY(1);
}

.scale-fade-leave-to {
  opacity: 0;
  transform: scaleY(0);
  transform-origin: bottom center;
}
</style>