<script setup lang="ts">

import ProfileHeader from "~/components/Organisms/ProfileHeader.vue";
</script>

<template>
  <div class="profile">
    <ProfileHeader/>
  </div>
</template>

<style scoped lang="scss">
.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
</style>