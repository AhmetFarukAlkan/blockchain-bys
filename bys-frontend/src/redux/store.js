import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {baseApi} from '../Api/Services/apiService';
import {loadingSlice} from './slices/loadingSlice';
import {mainSlice} from './slices/mainSlice';
import {modalSlice} from './slices/modalSlice';

const persistConfig = {
  key: 'blockChain',
  version: 1,
  storage,
  whitelist: ['main', 'modal']
};

const baseReducers = combineReducers({
  // Add the generated reducer as a specific top-level slice
  main: mainSlice.reducer,
  modal: modalSlice.reducer,
  loading: loadingSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, baseReducers);

export const store = configureStore({
  reducer: persistedReducer,
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Redux persist
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(baseApi.middleware),
});

setupListeners(store.dispatch);

// Export persistor
export const persistor = persistStore(store);
