import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/UserSlice';
import { persistReducer as persist, persistStore } from 'redux-persist'; // Rename the import using "as"

import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({ user: userReducer });
const persistConfig = {
    key: 'root',
    storage,
    version: 1,
}

const persistedReducer = persist(persistConfig, rootReducer); // Rename the local variable

export const store = configureStore({
    reducer: persistedReducer, // Use the renamed variable here
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
