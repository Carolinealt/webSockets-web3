import { configureStore } from "@reduxjs/toolkit";
import historyReducer from "./historySlice/historySlice";
import metaReducer from "./metaSlice/metaSlice";
import storage from "redux-persist/lib/storage";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'


const historyPersistConfig = {
    key: 'history',
    storage,
    whitelist: ["items"]
}

const metaPersistConfig = {
    key: 'meta',
    storage,
    whitelist: ["address"]
}

const persistedHystoryReducer = persistReducer(historyPersistConfig, historyReducer);
const persistedMetaReducer = persistReducer(metaPersistConfig, metaReducer);


export const store = configureStore({
    reducer: {
        valuesHistory: persistedHystoryReducer,
        metaMask: persistedMetaReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
            immutableCheck: false
        }),

});

export const persistor = persistStore(store)