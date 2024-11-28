<script setup lang="ts">

import ProfileAvatar from "~/components/Molecules/ProfileAvatar.vue";
import ProfileDetails from "~/components/Molecules/ProfileDetails.vue";
</script>

<template>
  <div class="profile-information">
    <ProfileAvatar/>
    <ProfileDetails/>
  </div>
</template>

<style scoped lang="scss">
.profile-information {
  display: flex;
  gap: .3rem;
  flex-direction: column;
}
</style>