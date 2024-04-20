// import {
//   applyMiddleware,
//   compose,
//   legacy_createStore as createStore,
// } from "redux";
// import { combineReducers } from "redux";
// import { userData } from "./Reducers/userData";
// import { BlockchainPublicData } from "./Reducers/BlockchainPublicData";
// import { ethPrice } from "./Reducers/ethPrice";
// import thunk from "redux-thunk";

// const reducer = {
//   BlockchainPublicData,
//   ethPrice,
//   userData,
// };

// const rootReducer = combineReducers(reducer);
// const middleware = [thunk];
// const composeEnhancers = compose(applyMiddleware(...middleware));

// const configureStore = () => {
//   return createStore(rootReducer, composeEnhancers);
// };

// const store = configureStore();
// export default store;

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
