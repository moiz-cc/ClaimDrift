const initialState = {};

export const BlockchainPublicData = (state = initialState, action) => {
  switch (action.type) {
    case "PUBLIC_DATA":
      return action.payload;

    default:
      return state;
  }
};
