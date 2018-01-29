import { createStore, applyMiddleware, compose } from 'redux'
import { Platform } from 'react-native'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

const middleware = [thunk]
let enhancer;

if (__DEV__) {
  const loggerMiddleware = require('redux-logger')
  const devTools = require('remote-redux-devtools')

  const composeEnhancers = devTools.composeWithDevTools({
    name: Platform.OS,
    ...require('../../package.json').remotedev,
  });

  middleware.push(loggerMiddleware({
    level: 'info',
    collapsed: true,
  }));

  enhancer = composeEnhancers(
    applyMiddleware(...middleware),
    applyAppStateListener()
  );

} else {
  enhancer = compose(
    applyMiddleware(...middleware),
    applyAppStateListener()
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
