<script setup lang="ts">
import { provide } from 'vue'
import SingleLocation from "~/components/Organisms/SingleLocation.vue";
import type {DetailedLocationWeather} from "~/types/weather";
import PageLoader from "~/components/Molecules/PageLoader.vue";
import {useFavorites} from "~/composables/useFavorites";

const favorites = useFavorites();
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
  } catch (e) {
    console.error(e)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div>
    <PageLoader v-if="isLoading" />
    <SingleLocation v-else/>
  </div>
</template>

<style scoped lang="scss">

</style>