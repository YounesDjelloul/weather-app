<script setup lang="ts">
import type {ProfileFormInput} from "~/types/user";

const props = defineProps<{
  inputDetails: ProfileFormInput;
}>();
const user = useUser()
</script>

<template>
  <div class="input-container">
    <label :for="inputDetails.id">{{ inputDetails.label }}</label>
    <input
        :disabled="!user.isProfileFormEditable"
        :type="inputDetails.type"
        :name="inputDetails.id"
        v-model="user.formState[inputDetails.id]"
        @keyup="user.validateField(inputDetails.id)"
    />
    <transition name="scale-fade">
      <div
          v-if="user.formErrors[inputDetails.id]"
          class="input-container__error"
      >
        {{ user.formErrors[inputDetails.id] }}
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.input-container {
  position: relative;

  &__error {
    color: #FF4C4C;
    font-size: 12px;
    position: relative;
    top: 10px;
    left: 10px;
    margin-bottom: 7px;
  }

  label {
    position: absolute;
    top: 8px;
    left: 12px;
    font-size: .55rem;
    font-weight: 600;
    color: #a8a8a8;
  }

  input {
    width: 100%;
    height: 100%;
    background: #F5F5F5;
    color: #000;
    padding: 25px 12px 7px;
    border-radius: 8px;
    outline: none;
    border: none;
    font-size: 12px;
  }
}
</style>