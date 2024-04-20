const initialState = {};

export const userData = (state = initialState, action) => {
  switch (action.type) {
    case "USER_DATA":
      return action.payload;

    default:
      return state;
  }
};
