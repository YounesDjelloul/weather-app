<script setup lang="ts">

const user = useUser()
</script>

<template>
  <div class="profile-action">
    <button
        type="submit"
        @click="user.isProfileFormEditable ? user.handleProfileSubmission() : user.toggleProfileFormEditable()"
    >
      {{ user.actionButtonText }}
    </button>
  </div>
</template>

<style scoped lang="scss">
.profile-action {
  width: 100%;
  align-content: center;

  button {
    width: 100%;
    background: #2E3A5A;
    height: 43px;
    font-size: 16px;
    color: #fff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    text-align: center;
    text-transform: uppercase;
    font-weight: 500;
  }
}
</style>