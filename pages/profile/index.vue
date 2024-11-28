<script setup lang="ts">

import ProfileHeader from "~/components/Organisms/ProfileHeader.vue";
import ProfileInformation from "~/components/Organisms/ProfileInformation.vue";
import ProfileForm from "~/components/Organisms/ProfileForm.vue";
</script>

<template>
  <div class="profile">
    <ProfileHeader/>
    <ProfileInformation/>
    <ProfileForm/>
  </div>
</template>

<style scoped lang="scss">
.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 1.4rem;
}
</style>