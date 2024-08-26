import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from './reducers';
import fetchInitialData from './initialdata';

const configureStore = async () => {
  const initialState = await fetchInitialData();
  const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
  return store;
};

export default configureStore;
