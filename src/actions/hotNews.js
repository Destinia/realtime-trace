export const FETCH_HOTNEWS_REQUEST = 'FETCH_HOTNEWS_REQUEST';
export const FETCH_HOTNEWS_SUCCESS = 'FETCH_HOTNEWS_SUCCESS';
export const FETCH_HOTNEWS_FAIL = 'FETCH_HOTNEWS_FAIL';

export const fetchHotNewsRequest = () => ({
  type: FETCH_HOTNEWS_REQUEST,
});

export const fetchHotNewsSuccess = (payload) => ({
  type: FETCH_HOTNEWS_SUCCESS,
  payload,
});

export const fetchHotNewsFail = (err) => ({
  type: FETCH_HOTNEWS_FAIL,
  error: true,
  payload: err,
});
