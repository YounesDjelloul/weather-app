<script setup lang="ts">
const props = defineProps<{
  forecastTemperature: string
}>()
</script>

<template>
  <div class="temperature">
    <span class="temperature__text">{{ forecastTemperature }}° C</span>
    <span class="temperature__action">
      <Icon name="eva:arrow-right-fill"/>
    </span>
  </div>
</template>

<style scoped lang="scss">
.temperature {
  display: flex;
  align-items: center;
  gap: 1.2rem;

  &__text {
    font-size: 1rem;
    font-weight: bold;
  }

  &__action {
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>