import { fork } from 'redux-saga/effects';
import { watchCreatePredictionRequest } from './prediction';
// single entry point to start all Sagas at once
function* rootSaga() {
  yield [
    fork(watchCreatePredictionRequest),
  ];
}

export default rootSaga;
