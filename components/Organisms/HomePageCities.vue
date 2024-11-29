<script setup lang="ts">
import HomePageCity from "~/components/Molecules/HomePageCity.vue";

const weather = useWeather()
</script>

<template>
  <div class="cities">
    <TransitionGroup
        name="city-list"
        tag="div"
        class="cities"
    >
      <HomePageCity
          @click="navigateTo(`cities/?lat=${city.coord.lat}&lon=${city.coord.lon}`)"
          v-for="city in weather.locationsWeatherData"
          :key="city.id"
          :city-details="city"
      />
    </TransitionGroup>
  </div>
</template>

<style scoped>
.cities {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.city-list-enter-active,
.city-list-leave-active {
  transition: all 0.5s ease;
}

.city-list-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.city-list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.city-list-move {
  transition: transform 0.5s ease;
}
</style>