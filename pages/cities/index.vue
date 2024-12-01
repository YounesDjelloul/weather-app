<script setup lang="ts">
import { provide } from 'vue'
import SingleLocation from "~/components/Organisms/SingleLocation.vue";
import type {DetailedLocationWeather} from "~/types/weather";
import PageLoader from "~/components/Molecules/PageLoader.vue";

const route = useRoute()
const lat = Number(route.query.lat)
const lon = Number(route.query.lon)

const weather = useWeather()
const cityDetails: Ref<DetailedLocationWeather | undefined> = ref(undefined)
provide("cityDetails", cityDetails)
const isLoading = ref(true)

onMounted(async () => {
  try {
    cityDetails.value = await weather.getWeatherDataByCords(lat, lon)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="city-details">
    <PageLoader v-if="isLoading || weather.isRefreshing" />
    <div class="city-details__no-data" v-else-if="!isLoading && !weather.isRefreshing && !cityDetails">No data Found</div>
    <SingleLocation v-else/>
  </div>
</template>

<style scoped lang="scss">
.city-details {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50vh;

  &__no-data {
    font-weight: 550;
    font-size: 1rem;
  }
}
</style>