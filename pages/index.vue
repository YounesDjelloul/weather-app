<script setup lang="ts">
import HomePageHeader from "~/components/Organisms/HomePageHeader.vue";
import HomePageCities from "~/components/Organisms/HomePageCities.vue";
import PageLoader from "~/components/Molecules/PageLoader.vue";
import type {Favorite} from "~/types/weather";

const weather = useWeather()
const favorites = useFavorites()

const getUserLocation = async () => {
  if (!navigator.geolocation) {
    throw new Error("Geolocation is not supported")
  }

  navigator.geolocation.getCurrentPosition(
      (position) => {
        const details: Favorite = {
          id: `${position.coords.latitude}-${position.coords.longitude}`,
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          isCurrent: true
        }
        favorites.saveFavoriteLocation(details)
      },
      (err) => {
        throw new Error("Unable to retrieve Location");
      }
  );
}

const isLoading = ref(true)

onMounted(async () => {
  try {
    await getUserLocation()
  } catch (e) {
    console.log(e)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="home">
    <HomePageHeader/>
    <PageLoader v-if="isLoading"/>
    <HomePageCities v-else/>
  </div>
</template>

<style scoped>
.home {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  gap: 1.5rem;
  background-color: #FFF;
  padding: 20px;
  margin-top: 30px;
  position: relative;
}
</style>