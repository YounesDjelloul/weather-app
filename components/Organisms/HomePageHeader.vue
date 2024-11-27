<script setup lang="ts">

import HeaderSearchPlaceholder from "~/components/Molecules/HeaderSearchPlaceholder.vue";
</script>

<template>
  <header class="header">
    <div class="header__navigation">
      <div class="header__navigation__title">Weather</div>
      <div class="header__navigation__profile">
        <Icon name="solar:user-bold-duotone" />
      </div>
    </div>
    <HeaderSearchPlaceholder class="header__search-placeholder" />
  </header>
</template>

<style scoped lang="scss">
.header {
  width: 100%;
  height: fit-content;
  background-color: #fcfcfc;
  display: flex;
  gap: .6rem;
  align-items: center;
  flex-direction: column;
  border: none;

  &__navigation {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .header__navigation__title {
      font-size: 1.3rem;
      font-weight: 550;
      font-family: Calibri, sans-serif;
    }

    .header__navigation__profile {
      cursor: pointer;
      font-size: 1.5rem;
    }
  }

  &__search-placeholder {
    width: 100%;
  }
}
</style>