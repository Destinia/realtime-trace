export const UPDATE_NEWSTIME_REQUEST = 'UPDATE_NEWSTIME_REQUEST';
export const UPDATE_NEWSTIME_SUCCESS = 'UPDATE_NEWSTIME_SUCCESS';
export const UPDATE_NEWSTIME_FAIL = 'UPDATE_NEWSTIME_FAIL';


export const updateNewsTimeRequest = (time) => ({
  type: UPDATE_NEWSTIME_REQUEST,
  payload: time,
});

export const updateNewsTimeSuccess = (time, payload) => ({
  type: UPDATE_NEWSTIME_SUCCESS,
  payload,
  time,
});

export const updateNewsTimeFail = (err) => ({
  type: UPDATE_NEWSTIME_FAIL,
  error: true,
  payload: err,
});
