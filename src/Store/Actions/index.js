export const publicData = (value) => {
  return {
    type: "PUBLIC_DATA",
    payload: value,
  };
};

export const ethPrice = (value) => {
  return {
    type: "UPDATE",
    payload: value,
  };
};

export const userData = (value) => {
  return {
    type: "USER_DATA",
    payload: value,
  };
};
