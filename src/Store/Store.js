import { configureStore } from "@reduxjs/toolkit";
import blockchainReducer from "./blockchainSlice";

const store = configureStore({
  reducer: {
    Blockchain: blockchainReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
