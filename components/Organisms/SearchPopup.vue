<script setup lang="ts">
import HeaderSearchInput from "~/components/Molecules/HeaderSearchInput.vue";
import {CModal, CModalBody} from "@coreui/vue/dist/esm/components/modal";

const props = defineProps(['searchPopupIsOpen'])
const emit = defineEmits(['toggleSearchPopup'])

const isOpen = computed({
  get: () => props.searchPopupIsOpen,
  set: () => emit('toggleSearchPopup')
})
</script>

<template>

  <CModal
      fullscreen
      :visible="isOpen"
      @close="emit('toggleSearchPopup')"
  >
    <CModalBody>
      <div class="search">
        <HeaderSearchInput  />
        <div class="search__results">
          <div>Milan</div>
          <div>Kuala Lumpur</div>
        </div>
      </div>
    </CModalBody>
  </CModal>
</template>

<style scoped lang="scss">
.search {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;

  &__results {
    display: flex;
    flex-direction: column;
    width: 100%;
    font-size: .8rem;

    > div {
      border-bottom: 1px solid #ccc;
      padding: .5rem;
      cursor: pointer;

      &:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>