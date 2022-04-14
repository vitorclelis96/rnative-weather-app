export interface WeatherCoord {
    lon: number,
    lat: number,
}

export interface WeatherData {
    id: number,
    main: string,
    description: string,
    icon: string
}

export interface WeatherMain {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number,
}

export interface WeatherWind {
    speed: number,
    deg: number,
}

export interface WeatherClouds {
    all: number,
}

export interface WeatherSys {
    type: number,
    id: number,
    country: string,
    sunrise: number,
    sunset: number
}

export interface WeatherApiData {
    coord: WeatherCoord
    weather: WeatherData[],
    base: string,
    main: WeatherMain,
    visibility: number,
    wind: WeatherWind,
    clouds: WeatherClouds,
    dt: number,
    sys: WeatherSys,
    timezone: number,
    id: number,
    name: string,
    cod: number,
}

export interface SimpleWeatherData {
    id: number,
    city: string,
    temp: number,
    humidity: number,
    max_temp: number,
    min_temp: number,
    coord: WeatherCoord,
    created_at: number,
}

export interface WeatherSliceState {
    currentWeather?: SimpleWeatherData,
    weatherHistoryList: SimpleWeatherData[],
}