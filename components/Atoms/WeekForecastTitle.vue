<script setup lang="ts">

</script>

<template>
  <div class="title">
    <div class="title__image">
<!--      <img src="" alt="title image"/>-->
      <Icon name="material-symbols:rainy-outline"/>
    </div>
    <div class="title__details">
      <div class="title__details__day">Monday</div>
      <div class="title__details__condition">Sunny</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.title {
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 70%;

  .title__image {
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .title__details {
    display: flex;
    flex-direction: column;
    font-size: .85rem;

    &__day {
      font-weight: bold;
    }
  }
}
</style>