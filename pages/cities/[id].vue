<script setup lang="ts">
import SingleLocation from "~/components/Organisms/SingleLocation.vue";
import type {LocationWeather} from "~/types/weather";

const route = useRoute()
const cityId = parseInt(route.params.id)

const weather = useWeather()
const cityDetails: Ref<LocationWeather | undefined> = ref(undefined)

onMounted(async () => {
  try {
    cityDetails.value = await weather.getWeatherDataById(cityId)
  } catch (e) {
    console.error(e)
  }
})


const hourlyForecasts = [
  {time: '12:00 PM', icon: 'https://example.com/weather-icon-1.png', temp: 18},
  {time: '1:00 PM', icon: 'https://example.com/weather-icon-2.png', temp: 19},
  {time: '2:00 PM', icon: 'https://example.com/weather-icon-3.png', temp: 20},
  {time: '3:00 PM', icon: 'https://example.com/weather-icon-4.png', temp: 19}
]

const dailyForecasts = [
  {day: 'Monday', icon: 'https://example.com/weather-icon-1.png', temp: 30},
  {day: 'Tuesday', icon: 'https://example.com/weather-icon-2.png', temp: 19},
  {day: 'Wednesday', icon: 'https://example.com/weather-icon-3.png', temp: 17},
  {day: 'Thursday', icon: 'https://example.com/weather-icon-4.png', temp: 17}
]
</script>

<template>
  <SingleLocation
      :location="'Milan, Italy'"
      :date="'Monday, 20 December 2021'"
      :currentTemp="24"
      :currentDescription="'Moderate Rain'"
      :weatherIcon="'https://example.com/weather-icon.png'"
      :hourlyForecasts="hourlyForecasts"
      :dailyForecasts="dailyForecasts"
  />
</template>

<style scoped lang="scss">

</style>