<script setup lang="ts">

</script>

<template>
  <div class="profile-details">
    <div class="profile-details__fullname">Jane Doe</div>
    <div class="profile-details__contact">
      <span class="profile-details__contact__email">jane@gmail.com</span>
      <span class="profile-details__contact__separator">|</span>
      <span class="profile-details__contact__phone">+01 234 567 89</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.profile-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  &__fullname {
    font-size: 1rem;
  }

  &__contact {
    display: flex;
    gap: .3rem;
    align-items: center;
    font-size: .9rem;
    color: #000;
  }
}
</style>