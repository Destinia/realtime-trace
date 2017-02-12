export const FETCH_COMMENTS_REQUEST = 'FETCH_COMMENTS_REQUEST';
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
export const FETCH_COMMENTS_FAIL = 'FETCH_COMMENTS_FAIL';

export const fetchCommentsRequest = (id) => ({
  type: FETCH_COMMENTS_REQUEST,
  payload: id,
});

export const fetchCommentsSuccess = (payload) => ({
  type: FETCH_COMMENTS_SUCCESS,
  payload,
});

export const fetchCommentsFail = (err) => ({
  type: FETCH_COMMENTS_FAIL,
  error: true,
  payload: err,
});
