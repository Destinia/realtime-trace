export const CREATE_PREDICTION_REQUEST = 'CREATE_PREDICTION_REQUEST';
export const CREATE_PREDICTION_SUCCESS = 'CREATE_PREDICTION_SUCCESS';
export const CREATE_PREDICTION_FAIL = 'CREATE_PREDICTION_FAIL';

export const createPredictionRequest = payload => ({
  type: CREATE_PREDICTION_REQUEST,
  payload,
});

export const createPredictionSuccess = payload => ({
  type: CREATE_PREDICTION_SUCCESS,
  payload,
});

export const createPredictionFail = err => ({
  type: CREATE_PREDICTION_FAIL,
  error: true,
  payload: err,
});
