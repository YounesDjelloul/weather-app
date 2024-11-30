import {setActivePinia, createPinia} from 'pinia'
import {beforeEach, describe, expect, it} from 'vitest'
import {useFavorites} from '../stores/favorites'
import type {Favorite} from "~/types/weather";

describe('Favorites Store', () => {
    let favoritesStore: ReturnType<typeof useFavorites>;

    beforeEach(() => {
        setActivePinia(createPinia());
        favoritesStore = useFavorites();
    });

    describe('Adding Favorite Locations', () => {
        it('should add a new favorite location', () => {
            const newLocation: Favorite = {id: 1, lat: 0, lon: 0};

            favoritesStore.saveFavoriteLocation(newLocation);

            expect(favoritesStore.favorites).toHaveLength(1);
            expect(favoritesStore.favorites[0]).toEqual(expect.objectContaining(newLocation));
        });

        it('should not add duplicate favorite locations', () => {
            const location: Favorite = {id: 1, lat: 2, lon: 3};

            favoritesStore.saveFavoriteLocation(location);
            favoritesStore.saveFavoriteLocation(location);

            expect(favoritesStore.favorites).toHaveLength(1);
        });
    });

    describe('Deleting Favorite Locations', () => {
        it('should delete a favorite location', () => {
            const location1: Favorite = {id: 1, lat: 33, lon: 9};
            const location2: Favorite = {id: 2, lat: 4, lon: 1};

            favoritesStore.saveFavoriteLocation(location1);
            favoritesStore.saveFavoriteLocation(location2);

            favoritesStore.deleteFavoriteLocation(1);

            expect(favoritesStore.favorites).toHaveLength(1);
            expect(favoritesStore.favorites[0].id).toBe(2);
        });

        it('should mark current location deletion', () => {
            const currentLocation: Favorite = {id: 1, lat: 33, isCurrent: true, lon: 9};

            favoritesStore.saveFavoriteLocation(currentLocation);
            favoritesStore.deleteFavoriteLocation(1);

            expect(favoritesStore.currentLocationDeleted).toBe(true);
        });

        it('should not affect currentLocationDeleted when non-current location is deleted', () => {
            const location: Favorite = {id: 1, lat: 33, isCurrent: false, lon: 9};

            favoritesStore.saveFavoriteLocation(location);
            favoritesStore.deleteFavoriteLocation(1);

            expect(favoritesStore.currentLocationDeleted).toBe(false);
        });
    });

    describe('Retrieving Favorite Locations', () => {
        it('should return all favorite locations', () => {
            const location1: Favorite = {id: 1, lat: 13, lon: 22};
            const location2: Favorite = {id: 2, lat: 47, lon: 81};

            favoritesStore.saveFavoriteLocation(location1);
            favoritesStore.saveFavoriteLocation(location2);

            const retrievedFavorites = favoritesStore.getFavoriteLocations();

            expect(retrievedFavorites).toHaveLength(2);
            expect(retrievedFavorites).toEqual(expect.arrayContaining([
                expect.objectContaining(location1),
                expect.objectContaining(location2)
            ]));
        });
    });
});