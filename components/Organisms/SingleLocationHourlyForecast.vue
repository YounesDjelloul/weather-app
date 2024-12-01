<script setup lang="ts">
import HourForecast from "~/components/Molecules/HourForecast.vue";
import type {DetailedLocationWeather} from "~/types/weather";
import {inject} from "vue";

const cityDetails: Ref<DetailedLocationWeather> | undefined = inject('cityDetails')
</script>

<template>
  <div class="hourly-forecast">
    <div class="hourly-forecast__title" role="heading">Hourly Forecast</div>
    <div class="hourly-forecast__forecasts" role="list">
      <HourForecast
          v-for="hourlyForecast in cityDetails?.hourly_forecast"
          :key="hourlyForecast.time"
          :forecast-details="hourlyForecast"
      />
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