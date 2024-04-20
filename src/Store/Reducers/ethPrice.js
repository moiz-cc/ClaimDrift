const initialState = 0;

export const ethPrice = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE":
      return action.payload;

    default:
      return state;
  }
};
