<script setup lang="ts">
const props = defineProps(['cityDetails'])
</script>

<template>
  <div class="city">
    <div class="city__top">
      <div class="city__top__details">
        <span class="top__details__location">{{ cityDetails.location_name }}</span>
        <span class="top__details__time">{{ cityDetails.time }}</span>
      </div>
      <div class="city__top__temperature">
        {{ cityDetails.temperature }}°
      </div>
    </div>
    <div class="city__bottom">
      <div class="city__bottom__condition">{{ cityDetails.weather_condition }}</div>
      <div class="city__bottom__cords">
        <span class="bottom__cords_lon">H:{{ cityDetails.coord.lon }}°</span>
        <span class="bottom__cords_lat">L:{{ cityDetails.coord.lat }}°</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.city {
  width: 100%;
  border-radius: 15px;
  background-color: #f4f4f4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  gap: 1.3rem;
  cursor: pointer;

  > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__top {
    &__details {
      display: flex;
      flex-direction: column;
      gap: 5px;

      .top__details__location {
        font-size: 1.2rem;
      }

      .top__details__time {
        font-size: .8rem;
      }
    }
    &__temperature {
      font-size: 2.3rem;
    }
  }

  &__bottom {
    &__condition {
      font-size: .7rem;
    }

    &__cords {
      font-size: .75rem;

      > span:first-child {
        margin-right: 5px;
      }
    }
  }
}
</style>