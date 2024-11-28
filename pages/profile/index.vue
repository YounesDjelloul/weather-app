<script setup lang="ts">

import ProfileHeader from "~/components/Organisms/ProfileHeader.vue";
import ProfileAvatar from "~/components/Molecules/ProfileAvatar.vue";
</script>

<template>
  <div class="profile">
    <ProfileHeader/>
    <ProfileAvatar/>
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