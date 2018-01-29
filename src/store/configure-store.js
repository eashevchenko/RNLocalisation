import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import {createLogger} from 'redux-logger'

import rootReducer from '../reducers'

const middleware = [thunk];
let enhancer;

//context object for using as last argument in Redux actions
let context = {
};

if (__DEV__) {
  middleware.push(createLogger({
    level: 'info',
    collapsed: true,
    diff: true,
  }));

  enhancer = compose(
    applyMiddleware(thunk.withExtraArgument(context), ...middleware)
  );

} else {
  enhancer = compose(
    applyMiddleware(thunk.withExtraArgument(context), ...middleware)
  );
}

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer)

  if (__DEV__) {
    if (module.hot) {
      module.hot.accept(() => {
        store.replaceReducer(require('../reducers').default)
      });
    }
  }

  return store
}
