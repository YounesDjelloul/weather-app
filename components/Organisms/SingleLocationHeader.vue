<script setup lang="ts">
import {inject} from 'vue'
import type {DetailedLocationWeather} from "~/types/weather";
import SingleLocationHeaderNavigation from "~/components/Molecules/SingleLocationHeaderNavigation.vue";

const weather = useWeather()
const cityDetails: Ref<DetailedLocationWeather> = inject('cityDetails')
</script>

<template>
  <header class="single-location-header">
    <SingleLocationHeaderNavigation/>
    <div class="single-location-header__date">
      {{ cityDetails?.datetime }}
    </div>
    <div class="single-location-header__condition">
      <img :src="cityDetails?.weather_icon_url" alt="weather-icon">
      <div>{{ cityDetails?.temperature }}° C</div>
      <div>{{ cityDetails?.weather_condition }}</div>
    </div>
    <div
        class="single-location-header__last-update"
        @click='weather.refreshLocationData(cityDetails)'
        role="button"
    >
      Last update at {{ cityDetails.last_updated }}
      <Icon name="mdi-light:refresh"/>
    </div>
  </header>
</template>

<style scoped lang="scss">
.single-location-header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  height: 370px;
  width: 100%;
  background: linear-gradient(to bottom right, #4F80FA, #3764D7, #335FD1);
  padding: 2rem 1.5rem 1rem;
  color: #FFF;

  &__date {
    font-size: .9rem;
  }

  &__condition {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 1.5rem;

    > div:last-child {
      font-weight: bold;
      font-size: 1.26rem;
    }
  }

  &__last-update {
    font-size: .8rem;
    display: flex;
    align-items: center;
    gap: .3rem;
    cursor: pointer;

    span {
      font-size: 1rem;
    }
  }
}
</style>