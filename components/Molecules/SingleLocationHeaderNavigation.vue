<script setup lang="ts">
import type {DetailedLocationWeather, Favorite} from "~/types/weather";
import {inject} from "vue";

const cityDetails: Ref<DetailedLocationWeather> = inject('cityDetails')

const favorites = useFavorites()

const getCitySavingDetails = (): Favorite => {
  return {
    id: cityDetails.value.id,
    lat: cityDetails.value.coord.lat,
    lon: cityDetails.value.coord.lon
  }
}

const actionIconToShow = computed(() => {
  return favorites.favorites.some((fav) => fav.id === cityDetails?.value.id)
      ? 'weui:back-outlined'
      : 'fa-solid:trash-alt'
})

const handleAction = () => {
  if (favorites.isLocationInFavorite(cityDetails?.value.id)) {
    favorites.deleteFavoriteLocation(cityDetails?.value.id)
    return
  }

  favorites.saveFavoriteLocation(getCitySavingDetails())
}
</script>

<template>
  <div class="single-location-header__navigation">
    <Icon
        class="single-location-header__navigation__back-action"
        name="ep:arrow-left"
        @click="navigateTo('/')"
        role="button"
    />
    <span class="single-location-header__navigation__location">{{
        cityDetails?.location_name
      }}, {{ cityDetails?.location_country }}</span>
    <transition name="icon-flip">
      <Icon
          role="button"
          :key="actionIconToShow"
          @click="handleAction"
          class="single-location-header__navigation__save-action"
          :name="actionIconToShow"
      />
    </transition>
  </div>
</template>

<style scoped lang="scss">
@import "../../assets/styles/transitions";

.single-location-header__navigation {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__back-action, &__save-action {
    cursor: pointer;
  }
}
</style>