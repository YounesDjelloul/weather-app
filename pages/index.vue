<script setup lang="ts">
import HomePageHeader from "~/components/Organisms/HomePageHeader.vue";
import HomePageCities from "~/components/Organisms/HomePageCities.vue";
import PageLoader from "~/components/Molecules/PageLoader.vue";

const weather = useWeather()

const isLoading = ref(true)

onMounted(async () => {
  try {
    await weather.fetchWeatherDetails()
  } catch (e) {
    console.log(e)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="home">
    <PageLoader v-if="isLoading"/>
    <HomePageHeader/>
    <HomePageCities v-if="!isLoading"/>
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