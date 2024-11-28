<script setup lang="ts">
import ProfileFormInput from "~/components/Molecules/ProfileFormInput.vue";
import ProfileAction from "~/components/Molecules/ProfileAction.vue";

const user = useUser()
</script>

<template>
  <div class="profile-form">
    <div class="profile-form__inputs-wrapper">
      <ProfileFormInput v-for="input in user.formInputs" :input-details="input"/>
    </div>
    <ProfileAction/>
  </div>
</template>

<style scoped lang="scss">
.profile-form {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  &__inputs-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: .8rem;
  }
}
</style>