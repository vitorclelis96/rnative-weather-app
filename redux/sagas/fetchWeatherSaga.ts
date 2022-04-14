import axios from 'axios';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { WeatherApiData } from '../../interfaces/Weather';
import { clearState, setError, setLoading } from '../applicationState/applicationSlice';
import { getWeather, setWeather } from '../weather/weatherSlice'

export function getWeatherFromApi(weatherUrl: string): Promise<WeatherApiData> {
    const weatherApiBaseUrl = new URL('https://api.openweathermap.org/data/2.5/weather');
    weatherApiBaseUrl.searchParams.append('q', weatherUrl);
    weatherApiBaseUrl.searchParams.append('appid', process.env.OPENWEATHERMAP_DOT_ORG_API_KEY || '');
    weatherApiBaseUrl.searchParams.append('units', 'metric');
    const url = weatherApiBaseUrl.href;

    return axios.request({
        method: 'GET',
        url,
    });
}

export function* handleGetWeather(action: any) {
    try {
        const { payload } = action;

        yield put(setLoading(true))
        // @ts-ignore
        const response = yield call(() => getWeatherFromApi(payload));

        const { data } = response;
        yield put(setWeather(data))
        yield put(clearState())
    } catch (error) {
        yield put(setError(true))
    }
}

export default function* fetchWeatherSaga() {
    yield takeLatest(getWeather.type, handleGetWeather)
}