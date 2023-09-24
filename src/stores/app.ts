import { defineStore } from "pinia";
import { Photo } from "~/types";
import { Video } from "~/types/videos";

type AppState = {
    favorites: {
        photos: Photo[];
        videos: Video[];
    };
    bookmarks: {
        photos: Photo[];
        videos: Video[];
    };
};

export const useAppStore = defineStore('app', {
    state: (): AppState => ({
        favorites: {
            photos: [] as Photo[],
            videos: [] as Video[],
        },
        bookmarks: {
            photos: [] as Photo[],
            videos: [] as Video[],
        },
    }),
    getters: {
        getFavorites: (state) => state.favorites,
        getBookmarks: (state) => state.bookmarks,
    },
    actions: {
        addFavoritePhoto(photo: Photo) {
            this.favorites.photos.push(photo);
            localStorage.setItem('favorites', JSON.stringify(this.favorites));
        },
        addFavoriteVideo(video: Video) {
            this.favorites.videos.push(video);
            localStorage.setItem('favorites', JSON.stringify(this.favorites));
        },
        addBookmarkPhoto(photo: Photo) {
            this.bookmarks.photos.push(photo);
            localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
        },
        addBookmarkVideo(video: Video) {
            this.bookmarks.videos.push(video);
            localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
        },
        removeFavoritePhoto(photo: Photo) {
            this.favorites.photos = this.favorites.photos.filter((item) => item.id !== photo.id);
            localStorage.setItem('favorites', JSON.stringify(this.favorites));
        },
        removeFavoriteVideo(video: Video) {
            this.favorites.videos = this.favorites.videos.filter((item) => item.id !== video.id);
            localStorage.setItem('favorites', JSON.stringify(this.favorites));
        },
        removeBookmarkPhoto(photo: Photo) {
            this.bookmarks.photos = this.bookmarks.photos.filter((item) => item.id !== photo.id);
            localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
        },
        removeBookmarkVideo(video: Video) {
            this.bookmarks.videos = this.bookmarks.videos.filter((item) => item.id !== video.id);
            localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
        },
        loadFavorites() {
            const favorites = localStorage.getItem('favorites');
            if (favorites) {
                this.favorites = JSON.parse(favorites);
            }
        },
        loadBookmarks() {
            const bookmarks = localStorage.getItem('bookmarks');
            if (bookmarks) {
                this.bookmarks = JSON.parse(bookmarks);
            }
        },
    },
});