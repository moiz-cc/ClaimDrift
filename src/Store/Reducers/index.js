import { data } from "./BlockchainPublicData";

import { combineReducers } from "redux";
import { ethPrice } from "./ethPrice";
import { userData } from "./userData";

const rootReducer = combineReducers({
  data,
  ethPrice,
  userData,
});

export default rootReducer;
