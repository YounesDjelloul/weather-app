<script setup lang="ts">
const emit = defineEmits(['closePopup'])

</script>

<template>
  <div class="popup-closure" @click="emit('closePopup')" role="button">
    <Icon name="radix-icons:cross-2"/>
  </div>
</template>

<style scoped lang="scss">
.popup-closure {
  position: absolute;
  top: 15px;
  right: 25px;
  font-size: 1.7rem;
  cursor: pointer;
}
</style>