<script setup lang="ts">
import HeaderSearchInput from "~/components/Molecules/HeaderSearchInput.vue";
import {CModal, CModalBody} from "@coreui/vue/dist/esm/components/modal";
import PageLoader from "~/components/Molecules/PageLoader.vue";
import type {SearchResult} from "~/types/weather";
import SearchPopupClosure from "~/components/Molecules/SearchPopupClosure.vue";

const props = defineProps(['searchPopupIsOpen'])
const emit = defineEmits(['toggleSearchPopup'])

const isOpen = computed({
  get: () => props.searchPopupIsOpen,
  set: () => emit('toggleSearchPopup')
})

const weather = useWeather()

const zoomInSuggestion = (suggestion: SearchResult) => {
  navigateTo(`cities/?lat=${suggestion.lat}&lon=${suggestion.lon}`)
  emit('toggleSearchPopup')
}
</script>

<template>

  <CModal
      fullscreen
      :visible="isOpen"
      @close="emit('toggleSearchPopup')"
  >
    <CModalBody>
      <div class="search">
        <HeaderSearchInput/>
        <SearchPopupClosure @close-popup="emit('toggleSearchPopup')" />
        <div class="search__results">
          <div
              class="search__results__placeholder"
              v-if="weather.suggestions.length == 0"
          >
            No results found.
          </div>
          <PageLoader v-if="weather.isSuggestionsLoading"/>
          <div
              v-else
              v-for="suggestion in weather.suggestions"
              @click="zoomInSuggestion(suggestion)"
          >
            {{ suggestion.location_name }}, {{ suggestion.location_country }}
          </div>
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
    position: relative;
    min-height: 100px;

    &__placeholder {
      font-weight: bold;
      font-size: .9rem;
    }

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