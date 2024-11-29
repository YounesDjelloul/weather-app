<script setup lang="ts">
import {inject} from 'vue'
import type {DetailedLocationWeather, Favorite} from "~/types/weather";
import {useFavorites} from "~/composables/useFavorites";

const favorites = useFavorites()

const cityDetails: Ref<DetailedLocationWeather> = inject('cityDetails')

const getCitySavingDetails = (): Favorite => {
  return {
    id: cityDetails.value.id,
    lat: cityDetails.value.coord.lat,
    lon: cityDetails.value.coord.lon
  }
}

const actionIconToShow = computed(() => favorites.favorites.value.some((fav) => fav.id === cityDetails?.value.id) ? 'mynaui:trash-solid' : 'mingcute:add-line')

const handleAction = () => {
  if (favorites.isLocationInFavorite(cityDetails?.value.id)) {
    favorites.deleteFavoriteLocation(cityDetails?.value.id)
    return
  }

  favorites.saveFavoriteLocation(getCitySavingDetails())
}
</script>

<template>
  <header class="single-location-header">
    <div class="single-location-header__navigation">
      <Icon class="single-location-header__navigation__back-action" name="ep:arrow-left" @click="navigateTo('/')"/>
      <span class="single-location-header__navigation__location">{{ cityDetails?.location_name }}, {{ cityDetails?.location_country }}</span>
      <Icon
          @click="handleAction"
          class="single-location-header__navigation__save-action"
          :name="actionIconToShow"
      />
    </div>
    <div class="single-location-header__date">
      {{ cityDetails?.datetime }}
    </div>
    <div class="single-location-header__condition">
      <img :src="cityDetails?.weather_icon_url" alt="weather-icon">
      <div>{{ cityDetails?.temperature }}° C</div>
      <div>{{ cityDetails?.weather_condition }}</div>
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
    font-size: 1.5rem;

    > div:last-child {
      font-weight: bold;
      font-size: 1.26rem;
    }
  }

  &__last-update {
    font-size: .8rem;
  }
}
</style>