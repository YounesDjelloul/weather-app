import {ref} from "vue";
import type {Favorite} from "~/types/weather";
import {defineStore} from "pinia";

export const useFavorites = defineStore('favorites', () => {
    const favorites: Ref<Favorite[]> = ref([])

    const getFavoriteLocations = () => {
        return favorites.value;
    };

    const saveFavoriteLocation = (coord: Favorite) => {
        coord.isCurrent ??= false;

        if (!isLocationInFavorite(coord.id)) {
            favorites.value.push(coord);
        }
    };

    const deleteFavoriteLocation = (id: number | string) => {
        favorites.value = favorites.value.filter((fav) => fav.id !== id);
    };

    const isLocationInFavorite = (id: number | string) => {
        return favorites.value.some((fav) => fav.id === id);
    };

    return {
        favorites,
        saveFavoriteLocation,
        deleteFavoriteLocation,
        isLocationInFavorite,
        getFavoriteLocations
    };
}, {
    persist: {
        storage: piniaPluginPersistedstate.localStorage(),
    },
})
