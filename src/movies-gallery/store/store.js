import { configureStore } from '@reduxjs/toolkit';
import { GallerySlice } from "./shows-gallery-slice"

export let store = configureStore({
    reducer: { gallery: GallerySlice.reducer},
})