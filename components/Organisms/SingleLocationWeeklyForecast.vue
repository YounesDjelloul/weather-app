<script setup lang="ts">

import WeekForecast from "~/components/Molecules/WeekForecast.vue";
import type {DetailedLocationWeather} from "~/types/weather";
import {inject} from "vue";

const cityDetails: Ref<DetailedLocationWeather> | undefined = inject('cityDetails')

</script>

<template>
  <div class="weekly-forecast">
    <div class="weekly-forecast__title">Weekly Forecast</div>
    <div class="weekly-forecast__forecasts">
      <WeekForecast
          v-for="dailyForecast in cityDetails?.daily_forecast"
          :key="dailyForecast.day"
          :forecast-details="dailyForecast"
      />
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