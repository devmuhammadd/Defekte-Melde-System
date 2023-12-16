import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import TicketSlice from "./slices/TicketsSlice";
import StationSlice from "./slices/StationSlice";

const persistConfig = {
    key: 'counter',
    storage,
};

const reducers = combineReducers({
    [TicketSlice.name]: TicketSlice.reducer,
    [StationSlice.name]: StationSlice.reducer
});

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    devTools: true
});
