<script setup lang="ts">

import WeekForecastTitle from "~/components/Atoms/WeekForecastTitle.vue";
import WeekForecastTemperature from "~/components/Atoms/WeekForecastTemperature.vue";
</script>

<template>
  <div class="week-forecast">
    <WeekForecastTitle/>
    <WeekForecastTemperature />
  </div>
</template>

<style scoped lang="scss">
.week-forecast {
  width: 100%;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #D2DFFF;
  border-radius: 12px;
}
</style>