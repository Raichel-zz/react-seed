import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import rootReducer from '../reducers';

const configureStore = initialState => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
      rootReducer,
      initialState,
      applyMiddleware(sagaMiddleware, thunk)
  );

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);
  return store;
};

export default configureStore;
