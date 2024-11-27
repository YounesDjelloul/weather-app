<script setup lang="ts">
import SingleLocationHeader from "~/components/Organisms/SingleLocationHeader.vue";
import SingleLocationHourlyForecast from "~/components/Organisms/SingleLocationHourlyForecast.vue";
import SingleLocationWeeklyForecast from "~/components/Organisms/SingleLocationWeeklyForecast.vue";
</script>

<template>
  <div class="single-location">
    <SingleLocationHeader />
    <SingleLocationHourlyForecast />
    <SingleLocationWeeklyForecast />
  </div>
</template>

<style lang="scss" scoped>
.single-location {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  margin-bottom: 20px;
}
</style>