<script setup lang="ts">
import ProfileInput from "~/components/Atoms/ProfileInput.vue";
import type {ProfileFormInput} from "~/types/user";

const props = defineProps<{
  inputDetails: ProfileFormInput;
}>();
</script>

<template>
  <div class="profile-form-input">
    <ProfileInput :input-details="inputDetails"/>
  </div>
</template>

<style scoped lang="scss">
.profile-form-input {
  width: 100%;
}
</style>