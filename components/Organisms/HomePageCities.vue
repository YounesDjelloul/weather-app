<script setup lang="ts">
import HomePageCity from "~/components/Molecules/HomePageCity.vue";

const weather = useWeather()
</script>

<template>
  <div class="cities">
    <HomePageCity
        @click="navigateTo(`cities/?lat=${city.coord.lat}&lon=${city.coord.lon}`)"
        v-for="city in weather.locationsWeatherData"
        :key="city.id"
        :city-details="city"
    />
  </div>
</template>

<style scoped>
.cities {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>