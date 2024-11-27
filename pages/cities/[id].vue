<script setup lang="ts">
import { provide } from 'vue'
import SingleLocation from "~/components/Organisms/SingleLocation.vue";
import type {DetailedLocationWeather} from "~/types/weather";
import PageLoader from "~/components/Molecules/PageLoader.vue";

const route = useRoute()
const cityId = parseInt(route.params.id)

const weather = useWeather()
const cityDetails: Ref<DetailedLocationWeather | undefined> = ref(undefined)
provide("cityDetails", cityDetails)
const isLoading = ref(true)

onMounted(async () => {
  try {
    cityDetails.value = await weather.getWeatherDataById(cityId)
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