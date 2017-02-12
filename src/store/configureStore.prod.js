import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';


const router = routerMiddleware(browserHistory);

const saga = createSagaMiddleware();

/**
 * Creates a preconfigured store.
 */
const configureStore = (preloadedState) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk, saga, router)
  );

  store.runSaga = saga.run;

  return store;
};


export default configureStore;
