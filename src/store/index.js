import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { useDispatch, useSelector } from "react-redux";

//import authReducer from "./slices/auth-slice/slice";
import themeReducer from "./slices/theme-slice/slice";
const rootReducer = combineReducers({
  theme: themeReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["theme"],
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Custom hooks for dispatch and selector
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
