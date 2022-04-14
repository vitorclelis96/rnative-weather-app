import { createSlice } from '@reduxjs/toolkit'
import { SimpleWeatherData, WeatherApiData, WeatherSliceState } from '../../interfaces/Weather'

const MAX_HISTORY_LENGTH = 5;

const initialState: WeatherSliceState = {
  currentWeather: undefined,
  weatherHistoryList: [],
}

interface SetWeatherPayload {
    payload: WeatherApiData,
    type: any
}

interface RemoveWeatherPayload {
  payload: number,
  type: any
}

const buildSimpleWeatherData: (weatherApiData: WeatherApiData) => SimpleWeatherData = (weatherApiData) => {
  return {
    id: weatherApiData.id,
    city: weatherApiData.name,
    coord: weatherApiData.coord,
    humidity: weatherApiData.main.humidity,
    max_temp: weatherApiData.main.temp_max,
    min_temp: weatherApiData.main.temp_min,
    temp: weatherApiData.main.temp,
    created_at: Date.now(),
  }
}

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
      getWeather: (state, payload) => {
        // Used to trigger sagas
      },
      removeWeatherFromId: (state, { payload, type}: RemoveWeatherPayload) => {
        state.weatherHistoryList = state.weatherHistoryList.filter((w) => w.id !== payload);
      },
      setWeather: (state, { payload, type }: SetWeatherPayload) => {
        // Copy weatherHistoryList and filter cases with same id.
        const stateWeatherHistoryListCopy = [...state.weatherHistoryList].filter((w) => w.id !== payload.id);

        // Pops one element if the list if full
        if (state.weatherHistoryList.length === MAX_HISTORY_LENGTH) {
          stateWeatherHistoryListCopy.shift();
        }

        const currentWeather = buildSimpleWeatherData(payload)
        stateWeatherHistoryListCopy.push(currentWeather);
        
        state.currentWeather = currentWeather;
        state.weatherHistoryList = stateWeatherHistoryListCopy.reverse();
      },
  },
})

// Action creators are generated for each case reducer function
export const { getWeather, setWeather, removeWeatherFromId } = weatherSlice.actions

export default weatherSlice.reducer