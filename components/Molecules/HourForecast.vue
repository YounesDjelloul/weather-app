<script setup lang="ts">

</script>

<template>
  <div class="hour-forecast">
    <div class="hour-forecast__image">
<!--      <img src="" alt="Forecast Image" />-->
      <Icon name="material-symbols:rainy-outline"/>
    </div>
    <div class="hour-forecast__temperature">
      24°
    </div>
    <div class="hour-forecast__time">
      12:00 PM
    </div>
  </div>
</template>

<style scoped lang="scss">
.hour-forecast {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 107px;
  width: 78px;
  border-radius: 4px;
  background-color: #f5f5f5;
  padding: 16px 8px 8px;

  &__image {
    font-size: 24px;
  }

  &__temperature {
    font-weight: 550;
    font-size: 1rem;
    color: #201C1C;
  }

  &__time {
    font-size: .76rem;
    color: #494343;
  }
}
</style>