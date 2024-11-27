<script setup lang="ts">

import WeekForecast from "~/components/Molecules/WeekForecast.vue";
</script>

<template>
  <div class="weekly-forecast">
    <div class="weekly-forecast__title">Weekly Forecast</div>
    <div class="weekly-forecast__forecasts">
      <WeekForecast v-for="i in 5" :key="i" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.weekly-forecast {
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
    flex-direction: column;
  }
}
</style>