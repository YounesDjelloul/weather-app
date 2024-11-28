<script setup lang="ts">
const user = useUser()
</script>

<template>
  <div class="profile-details">
    <div class="profile-details__fullname">{{ user.userDetails.fullname }}</div>
    <div class="profile-details__contact">
      <span class="profile-details__contact__email">{{ user.userDetails.email }}</span>
      <span class="profile-details__contact__separator">|</span>
      <span class="profile-details__contact__phone">{{ user.userDetails.phone }}</span>
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