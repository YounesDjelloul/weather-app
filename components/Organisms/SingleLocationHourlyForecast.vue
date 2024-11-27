<script setup lang="ts">

import HourForecast from "~/components/Molecules/HourForecast.vue";
</script>

<template>
  <div class="hourly-forecast">
    <div class="hourly-forecast__title">Hourly Forecast</div>
    <div class="hourly-forecast__forecasts">
      <HourForecast v-for="i in 3" :key="i" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.hourly-forecast {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  gap: .7rem;

  &__title {
    font-size: 1.2rem;
    font-weight: bold;
  }

  &__forecasts {
    display: flex;
    gap: 1rem;
    overflow: scroll;
  }
}
</style>