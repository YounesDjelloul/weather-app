<script setup lang="ts">

</script>

<template>
  <div class="profile-header" role="navigation">
    <NuxtLink to="/" role="button">
      <Icon class="profile-header__back-icon" name="weui:back-outlined"/>
    </NuxtLink>
    <div class="profile-header__title" role="heading">Edit Profile</div>
  </div>
</template>

<style scoped lang="scss">
.profile-header {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 .5rem 1.3rem;
  gap: 35%;

  &__back-icon {
    font-size: 1.3rem;
    cursor: pointer;
  }

  &__title {
    font-size: 1rem;
    font-weight: 600;
  }
}
</style>