import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_KEY, axiosInstance } from "../helpers/helper";

// Initial state for the weather slice
export const initialState = {
  locationsPending: "idle", // State for tracking the status of the locations request
  isWeatherPending: true, // State for tracking the status of the weather request
  locations: [], // Array to store location data
  weatherCondition: null, // Object to store weather condition data
};

// Thunk to fetch geolocation data based on city name
export const getGeoLocations = createAsyncThunk(
  "getGeoLocation",
  async (city_name) => {
    // Make API request to get geolocation data
    const res = await axiosInstance.get(
      `geo/1.0/direct?q=${city_name}&limit=10&appid=${API_KEY}`
    );
    return res;
  }
);

// Thunk to fetch weather condition data based on latitude and longitude
export const getWeatherCondition = createAsyncThunk(
  "getWeatherCondition",
  async (data) => {
    // Make API request to get weather condition data
    const res = await axiosInstance.get(
      `data/2.5/weather?lat=${data?.lat}&lon=${data?.lon}&appid=${API_KEY}`
    );
    return res;
  }
);

// Create weather slice
export const weatherSlice = createSlice({
  name: "weather", // Name of the slice
  initialState, // Initial state defined above
  reducers: {
    // Reducer to clear the city list
    clearCityList: (state, action) => {
      state.locations = []; // Clear locations array
      state.locationsPending = "idle"; // Reset locations pending state
    },
  },
  extraReducers: (builder) => {
    // Handle pending state for getGeoLocations thunk
    builder
      .addCase(getGeoLocations.pending, (state, action) => {
        state.locationsPending = "idle"; // Set locations pending state to idle
      })
      // Handle fulfilled state for getGeoLocations thunk
      .addCase(getGeoLocations.fulfilled, (state, { payload }) => {
        if (payload.status === 200) {
          state.locationsPending = "success"; // Set locations pending state to success
          state.locations = payload?.data; // Store location data
        }
      })
      // Handle rejected state for getGeoLocations thunk
      .addCase(getGeoLocations.rejected, (state, action) => {
        state.locationsPending = "idle"; // Set locations pending state to idle
      });

    // Handle pending state for getWeatherCondition thunk
    builder
      .addCase(getWeatherCondition.pending, (state, action) => {
        state.isWeatherPending = true; // Set weather pending state to true
      })
      // Handle fulfilled state for getWeatherCondition thunk
      .addCase(getWeatherCondition.fulfilled, (state, { payload }) => {
        if (payload.status === 200) {
          state.weatherCondition = payload?.data; // Store weather condition data
          state.isWeatherPending = false; // Set weather pending state to false
        }
      })
      // Handle rejected state for getWeatherCondition thunk
      .addCase(getWeatherCondition.rejected, (state, action) => {
        state.isWeatherPending = true; // Set weather pending state to true
      });
  },
});

// Export actions from the weather slice
export const { clearCityList } = weatherSlice.actions;

// Export the weather reducer
export default weatherSlice.reducer;
