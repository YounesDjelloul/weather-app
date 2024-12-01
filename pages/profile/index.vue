<script setup lang="ts">

import ProfileHeader from "~/components/Organisms/ProfileHeader.vue";
import ProfileInformation from "~/components/Organisms/ProfileInformation.vue";
import ProfileForm from "~/components/Organisms/ProfileForm.vue";
import PageLoader from "~/components/Molecules/PageLoader.vue";

const user = useUser()
</script>

<template>
  <div class="profile">
    <ProfileHeader/>
    <PageLoader v-if="user.isFormLoading"/>
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
  height: 95vh;
  gap: 1.4rem;
  padding-bottom: 2.5rem;
  position: relative;
}
</style>