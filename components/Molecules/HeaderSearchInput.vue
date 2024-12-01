<script setup lang="ts">
const weather = useWeather()
const q = ref('')
</script>

<template>
  <div>
    <div class="search-input">
      <div class="search-input__icon">
        <Icon name="si:search-duotone" />
      </div>
      <input v-model="q" @keyup="weather.fetchSuggestions(q)" type="text" placeholder="Search for a city or airport">
    </div>
  </div>
</template>

<style scoped lang="scss">
  .search-input {
    width: 90%;
    height: 2.35rem;
    position: relative;
    display: flex;
    align-items: center;

    &__icon {
      position: absolute;
      left: 0.9rem;
      font-size: 1rem;
      top: 8px;
    }

    input {
      padding: .2rem .2rem .2rem 2.5rem;
      height: 100%;
      width: 100%;
      font-size: .8rem;
      font-weight: 400;
      color: #000;
      outline: none;
      background-color: #F7F7F9;
      border: none;
      border-radius: 10px;
    }
  }
</style>