import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_KEY, axiosInstance } from "../helpers/helper";

export const initialState = {
  locationsPending: "idle",
  isWeatherPending: true,
  locations: [],
  weatherCondition: null,
};

export const getGeoLocations = createAsyncThunk(
  "getGeoLocation",
  async (city_name) => {
    const res = await axiosInstance.get(
      `geo/1.0/direct?q=${city_name}&limit=10&appid=${API_KEY}`
    );
    return res;
  }
);

export const getWeatherCondition = createAsyncThunk(
  "getWeatherCondition",
  async (data) => {
    const res = await axiosInstance.get(
      `data/2.5/weather?lat=${data?.lat}&lon=${data?.lon}3&appid=${API_KEY}`
    );
    return res;
  }
);

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    clearCityList: (state, action) => {
      state.locations = [];
      state.locationsPending = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGeoLocations.pending, (state, action) => {
        state.locationsPending = "idle";
      })
      .addCase(getGeoLocations.fulfilled, (state, { payload }) => {
        if (payload.status === 200) {
          state.locationsPending = "success";
          state.locations = payload?.data;
        }
      })
      .addCase(getGeoLocations.rejected, (state, action) => {
        state.locationsPending = "idle";
      });

    // get weather condition

    builder
      .addCase(getWeatherCondition.pending, (state, action) => {
        state.isWeatherPending = true;
      })
      .addCase(getWeatherCondition.fulfilled, (state, { payload }) => {
        if (payload.status === 200) {
          state.weatherCondition = payload?.data;
          state.isWeatherPending = false;
        }
      })
      .addCase(getWeatherCondition.rejected, (state, action) => {
        state.isWeatherPending = true;
      });
  },
});

export const { clearCityList } = weatherSlice.actions;

export default weatherSlice.reducer;
