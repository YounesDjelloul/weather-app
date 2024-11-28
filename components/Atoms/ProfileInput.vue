<script setup lang="ts">
const props = defineProps(['inputDetails'])

</script>

<template>
  <div class="input-container">
    <label :for="inputDetails.id">{{ inputDetails.label }}</label>
    <input disabled :type="inputDetails.type" :name="inputDetails.id" v-model="inputDetails.value"/>
  </div>
</template>

<style scoped lang="scss">
.input-container {
  height: 50px;
  position: relative;

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