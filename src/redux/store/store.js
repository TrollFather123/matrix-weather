import { configureStore } from "@reduxjs/toolkit";
import weatherSlice from "../slice/weatherSlice";

// Configure and create the Redux store
export const store = configureStore({
    reducer: {
        // Add weather slice reducer to the store
        weather: weatherSlice
    }
});
