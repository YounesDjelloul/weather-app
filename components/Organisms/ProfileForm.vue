<script setup lang="ts">
import ProfileFormInput from "~/components/Molecules/ProfileFormInput.vue";

const formInputs = ref([
  {
    id: 'fullname',
    label: 'Full name',
    type: 'text',
    value: 'John joe',
  },
  {
    id: 'email',
    label: 'Email',
    type: 'email',
    value: 'younes@example.com',
  },
  {
    id: 'Phone Number',
    label: 'Phone Number',
    type: 'text',
    value: '1234567890',
  }
])
</script>

<template>
  <div class="profile-form">
    <ProfileFormInput v-for="input in formInputs" :input-details="input"/>
  </div>
</template>

<style scoped lang="scss">
.profile-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: .8rem;
}
</style>