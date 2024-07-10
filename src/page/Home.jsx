import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCityList,
  getGeoLocations,
  getWeatherCondition,
} from "../redux/slice/weatherSlice";
import Wrapper from "../components/Wrapper";
import {
  Box,
  List,
  ListItem,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  WeatherLeftPanel,
  WeatherRightPanel,
} from "../ui/styles/WeatherRightPanel";
import TempMaxIcon from "../ui/icons/TempMaxIcon";
import TempMinIcon from "../ui/icons/TempMinIcon";
import HumidityIcon from "../ui/icons/HumidityIcon";
import CludyIcon from "../ui/icons/CludyIcon";
import WindIcon from "../ui/icons/WindIcon";

// Function to convert temperature from Kelvin to Celsius
function fahrenheitToCelsius(kelvin) {
  return Math.floor(kelvin - 273.15);
}

const Home = () => {
  const [cityName, setCityName] = useState(""); // State for storing the city name input
  const { locations, locationsPending, weatherCondition, isWeatherPending } =
    useSelector((s) => s.weather); // Extracting data from Redux store
  const dispatch = useDispatch(); // Redux dispatch function

  useEffect(() => {
    if (cityName.length) {
      setTimeout(() => {
        dispatch(getGeoLocations(cityName)); // Fetch geolocation data when cityName changes
      }, 2000);
    }
  }, [cityName]);

  const getWeatherList = (lat, lon) => {
    const body = {
      lat,
      lon,
    };
    dispatch(getWeatherCondition(body)).then((data) => {
      if(data?.payload?.status === 200){
        dispatch(clearCityList()) // Clear city list after fetching weather data
      }
    });
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const body = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };
          dispatch(getWeatherCondition(body)); // Fetch initial weather data when browser loads for first time
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <Wrapper>
      <WeatherRightPanel>
        <TextField
          type="text"
          placeholder="Search Cities..."
          onChange={(e) => setCityName(e.target.value)} // Update city name state
          value={cityName}
          fullWidth
        />
        {/* <button onClick={handelWeather}>Submit</button> */}

        {locationsPending === "success" ? (
          <List>
            {locations?.map((_data) => (
              <ListItem
                key={_data.lat}
                sx={{cursor:"pointer"}}
                onClick={() => {
                  getWeatherList(_data.lat, _data.lon); // Fetch weather data for selected location
                  setCityName("");
                }}
              >
                country: {_data?.country} city: {_data?.name}
              </ListItem>
            ))}
          </List>
        ) : cityName ? (
          <p>Pending...</p> // Show pending state
        ) : null}

        <Box className="weather_details">
          <Typography variant="h5">Weather Details</Typography>
          {!isWeatherPending && weatherCondition ? (
            <List>
              <ListItem>
                <Typography>Temperature Max: </Typography>
                <Stack direction="row" alignItems={"center"}>
                  {fahrenheitToCelsius(weatherCondition?.main?.temp_max)}°C
                  <i>
                    <TempMaxIcon />
                  </i>
                </Stack>
              </ListItem>
              <ListItem>
                <Typography>Temperature Min: </Typography>
                <Stack direction="row" alignItems={"center"}>
                  {fahrenheitToCelsius(weatherCondition?.main?.temp_min)}°C
                  <i>
                    <TempMinIcon />
                  </i>
                </Stack>
              </ListItem>

              <ListItem>
                <Typography>Humidity: </Typography>
                <Stack direction="row" alignItems={"center"}>
                  {weatherCondition?.main?.humidity}%
                  <i>
                    <HumidityIcon />
                  </i>
                </Stack>
              </ListItem>
              <ListItem>
                <Typography>Clouds: </Typography>
                <Stack direction="row" alignItems={"center"}>
                  {weatherCondition?.clouds?.all}%
                  <i>
                    <CludyIcon />
                  </i>
                </Stack>
              </ListItem>
              <ListItem>
                <Typography>Winds: </Typography>
                <Stack direction="row" alignItems={"center"}>
                  {weatherCondition?.wind?.speed} M/S
                  <i>
                    <WindIcon />
                  </i>
                </Stack>
              </ListItem>
            </List>
          ) : (
            <List>
              {Array.from({ length: 5 }, (_, index) => index + 1).map(
                (_data) => (
                  <ListItem key={_data}>
                    <Skeleton variant="text" width="100%" />
                  </ListItem>
                )
              )}
            </List>
          )}
        </Box>
      </WeatherRightPanel>
      <WeatherLeftPanel>
        <Stack
          direction="row"
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          {!isWeatherPending ? (
            <>
              <Box className="main_panel">
                <Typography variant="h1">
                  {fahrenheitToCelsius(weatherCondition?.main?.temp)}°
                </Typography>
              </Box>
              <Box className="sub_panel">
                <Typography variant="h4">
                  {weatherCondition?.name}, {weatherCondition?.sys?.country}
                </Typography>
                <Typography variant="h3">
                  Feels Like:{" "}
                  {fahrenheitToCelsius(weatherCondition?.main?.feels_like)}°
                </Typography>
              </Box>
              <Stack
                direction="row"
                alignItems={"center"}
                className="type_panel"
              >
                <Typography variant="h6">
                  {weatherCondition?.weather[0]?.main}
                </Typography>
                <i>
                  <img
                    src={`https://openweathermap.org/img/w/${weatherCondition?.weather[0]?.icon}.png`}
                    alt=""
                  />
                </i>
              </Stack>
            </>
          ) : (
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent="space-between"
              flexWrap='wrap'
              sx={{width:'100%'}}
            >   
              <Skeleton variant="circular" width={100} height={100} /> 
              <Box sx={{width:'33.33%'}}>
                <Skeleton variant="text" width={"100%"} />
                <Skeleton variant="text" width={"100%"} />
              </Box>
              <Skeleton variant="rectangular" width={50} height={50} />
            </Stack>
          )}
        </Stack>
      </WeatherLeftPanel>
    </Wrapper>
  );
};

export default Home;
