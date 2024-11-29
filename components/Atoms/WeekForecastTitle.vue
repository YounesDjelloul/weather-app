<script setup lang="ts">
const props = defineProps<{
  weatherIconUrl: string
  forecastDay: string
  forecastCondition: string
}>()
</script>

<template>
  <div class="title">
    <div class="title__image">
      <img :src="weatherIconUrl" alt="title image"/>
    </div>
    <div class="title__details">
      <div class="title__details__day">{{ forecastDay }}</div>
      <div class="title__details__condition">{{ forecastCondition }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.title {
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 70%;

  &__image {
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 100%;
      height: 100%;
    }
  }

  &__details {
    display: flex;
    flex-direction: column;
    font-size: .85rem;

    &__day {
      font-weight: bold;
    }
  }
}
</style>