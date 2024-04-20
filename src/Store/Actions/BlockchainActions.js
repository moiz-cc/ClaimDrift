export const get = (data, history) => {
  return async (dispatch) => {
    try {
      const apiResponse = await getAllTransactions(data);
      const { status, body } = apiResponse.data;
      if (status.code !== 0) {
        body?.message && dispatch(setAppError(apiResponse.data, history));
        dispatch(loginFailedAction(""));
        return;
      }
      dispatch(confirmedAllTxAction(body.data, dispatch));
    } catch (error) {
      dispatch(clearTxAction(dispatch));
      if (error?.response) {
        dispatch(setAppError(error.response.data, history));
      } else {
        dispatch(setAppError(error, history));
      }
    }
  };
};
