<script setup lang="ts">
import {inject} from 'vue'
import type {LocationWeather} from "~/types/weather";

const weather = useWeather()

const cityDetails: Ref<LocationWeather> | undefined = inject('cityDetails')

const getCitySavingDetails = () => {
  return {
    id: cityDetails?.value.id,
    lat: cityDetails?.value.coord.lat,
    lon: cityDetails?.value.coord.lon
  }
}

const actionIconToShow = computed(() => weather.isLocationInFavorite(cityDetails?.value.id) ? 'mynaui:trash-solid' : 'mingcute:add-line')

const handleAction = () => {
  if (weather.isLocationInFavorite(cityDetails?.value.id)) {
    weather.deleteFavoriteLocation(cityDetails?.value.id)
    return
  }

  weather.saveFavoriteLocation(getCitySavingDetails())
}
</script>

<template>
  <header class="single-location-header">
    <div class="single-location-header__navigation">
      <Icon class="single-location-header__navigation__back-action" name="ep:arrow-left" @click="navigateTo('/')"/>
      <span class="single-location-header__navigation__location">{{ cityDetails?.location_name }}</span>
      <Icon
          @click="handleAction"
          class="single-location-header__navigation__save-action"
          :name="actionIconToShow"
      />
    </div>
    <div class="single-location-header__date">
      Monday, 20 December 2021
    </div>
    <div class="single-location-header__condition">
      <div>24° C</div>
      <div>Moderate Rain</div>
    </div>
    <div class="single-location-header__last-update">
      Last update at 11:00 AM
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
  padding: 1.2rem 1.5rem;
  color: #FFF;

  &__navigation {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__back-action, &__save-action {
      cursor: pointer;
    }
  }

  &__date {
    font-size: .9rem;
  }

  &__condition {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 1.2rem;

    > div:last-child {
      font-weight: bold;
    }
  }

  &__last-update {
    font-size: .8rem;
  }
}
</style>