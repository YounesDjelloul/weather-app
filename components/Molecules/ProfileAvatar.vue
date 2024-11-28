<script setup lang="ts">
const isEditable = ref(false)

const avatarUpload = ref<HTMLInputElement | null>(null)
const selectedAvatar = ref<File | null>(null)
const avatarPreview = ref('')

const triggerAvatarUpload = () => {
  avatarUpload.value?.click()
}

const handleAvatarChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const avatar = target.files?.[0]

  if (avatar) {
    selectedAvatar.value = avatar

    const reader = new FileReader();
    reader.onloadend = () => {
      avatarPreview.value = reader.result as string;
    };
    reader.readAsDataURL(avatar);
  }
}

const getProfilePictureUrl = () => {
  return avatarPreview.value || '/images/avatar-sample.jpg'
}
</script>

<template>
  <div class="profile-avatar">
    <img :src="getProfilePictureUrl()" alt="current-avatar">
    <input
      v-if="isEditable"
      type="file"
      ref="avatarUpload"
      style="display: none;"
      accept="image/*"
      @change="handleAvatarChange"
    >
    <span v-if="isEditable" class="profile-avatar__edit-button" @click="triggerAvatarUpload">
      <Icon name="fluent:edit-24-regular"/>
    </span>
  </div>
</template>

<style scoped lang="scss">
.profile-avatar {
  position: relative;
  margin: 0 auto;
  width: fit-content;

  img {
    border-radius: 50%;
    width: 90px;
    height: 90px;
    cursor: pointer;
    outline: 3.2px solid #FFF;
  }

  &__edit-button {
    position: absolute;
    bottom: 0;
    right: -7px;
    background-color: #eeeeee;
    padding: 8px 3px;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    outline: 1.2px solid #FFF;

    span {
      color: #000;
      font-size: 13.4px;
    }
  }
}
</style>