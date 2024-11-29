<script setup lang="ts">
import type {HourlyForecast} from "~/types/weather";

const props = defineProps<{
  forecastDetails: HourlyForecast
}>()
</script>

<template>
  <div class="hour-forecast">
    <div class="hour-forecast__image">
      <img :src="forecastDetails.weather_icon_url" alt="Forecast Image" />
    </div>
    <div class="hour-forecast__temperature">
      {{ forecastDetails.temperature }}°
    </div>
    <div class="hour-forecast__time">
      {{ forecastDetails.time }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.hour-forecast {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 107px;
  width: 78px;
  min-width: 78px;
  border-radius: 4px;
  background-color: #f5f5f5;
  padding: 8px;

  &__image {
    width: 45px;
    height: 45px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  &__temperature {
    font-weight: 550;
    font-size: 1rem;
    color: #201C1C;
  }

  &__time {
    font-size: .76rem;
    color: #494343;
  }
}
</style>