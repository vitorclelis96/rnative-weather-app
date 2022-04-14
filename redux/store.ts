import { configureStore, } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import weatherReducer from './weather/weatherSlice';
import createSagaMiddleware from '@redux-saga/core';
import fetchWeatherSaga from './sagas/fetchWeatherSaga';
import applicationStateReducer from './applicationState/applicationSlice';

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
  weather: weatherReducer,
  applicationState: applicationStateReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['applicationState'],
}

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})

export const persistor = persistStore(store);

sagaMiddleware.run(fetchWeatherSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch