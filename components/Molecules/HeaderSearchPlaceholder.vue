<script setup lang="ts">

import SearchPopup from "~/components/Organisms/SearchPopup.vue";

const searchPopupIsOpen = ref(false);
</script>

<template>
  <div>
    <SearchPopup
        :search-popup-is-open="searchPopupIsOpen"
        @toggle-search-popup="searchPopupIsOpen = false"
    />
    <div class="search-input-placeholder" @click="searchPopupIsOpen=true" role="button">
      <div class="search-input-placeholder__icon">
        <Icon name="si:search-duotone" />
      </div>
      <div>Search for a city or airport</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.search-input-placeholder {
  width: 100%;
  height: 2.35rem;
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: center;
  padding: .2rem .2rem .2rem 2.5rem;
  background-color: #F7F7F9;
  border-radius: 10px;
  cursor: pointer;

  &__icon {
    position: absolute;
    left: 0.9rem;
    font-size: 1rem;
  }

  > div {
    height: 100%;
    width: 100%;
    font-size: .8rem;
    font-weight: 400;
    color: #6b6b6b;
    padding: 1rem 0;
    display: flex;
    align-items: center;
  }
}
</style>