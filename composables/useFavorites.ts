import { ref, onMounted } from "vue";
import type {Favorite} from "~/types/weather";

const FAVORITES_KEY = 'favorite_locations';

export const useFavorites = () => {
    const favorites: Ref<Favorite[]> = ref([])

    const getFavoriteLocations = () => {
        const storedFavorites = localStorage.getItem(FAVORITES_KEY);
        favorites.value = storedFavorites ? JSON.parse(storedFavorites) : [];
        return favorites.value;
    };

    const saveFavoriteLocation = (coord: Favorite) => {
        if (!favorites.value.some((fav) => fav.id === coord.id)) {
            favorites.value.push(coord);
            localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites.value));
        }
    };

    const deleteFavoriteLocation = (id: number | string) => {
        favorites.value = favorites.value.filter((fav) => fav.id !== id);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites.value));
    };

    const isLocationInFavorite = (id: number | string) => {
        return favorites.value.some((fav) => fav.id === id);
    };

    onMounted(() => getFavoriteLocations())

    return {
        favorites,
        saveFavoriteLocation,
        deleteFavoriteLocation,
        isLocationInFavorite,
        getFavoriteLocations
    };
};
