import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import * as api from '../apis';
import * as actions from '../actions/prediction';

export function* createPrediction({ payload }) {
  try {
    const response = yield call(api.createPrediction, payload);
    const prediction = response.jsonData;
    yield put(actions.createPredictionSuccess(prediction));
  } catch (err) {
    yield put(actions.createPredictionFail(err));
  }
}

export function* watchCreatePredictionRequest() {
  yield takeLatest(actions.CREATE_PREDICTION_REQUEST, createPrediction);
}
