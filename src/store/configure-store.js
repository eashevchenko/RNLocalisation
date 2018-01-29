import { NativeModules, NativeEventEmitter, AsyncStorage } from 'react-native'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import rootReducer from '../reducers'

import {createLogger} from 'redux-logger'
import logAsyncStorage from 'react-native-log-async-storage'

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

  //log AsyncStorage

    const AsyncStorageDevMenuItem = NativeModules.AsyncStorageDevMenuItem;
    const asyncStorageDevMenuItemEmitter = new NativeEventEmitter(AsyncStorageDevMenuItem);

    asyncStorageDevMenuItemEmitter.addListener('LogAsyncStorage', logAsyncStorage);

    AsyncStorageDevMenuItem.initialize()

} else {
  enhancer = compose(
    applyMiddleware(thunk.withExtraArgument(context), ...middleware)
  );
}

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore(initialState) {
  const store = createStore(persistedReducer, initialState, enhancer);
  const persistor = persistStore(store);

  if (__DEV__) {
    if (module.hot) {
      module.hot.accept(() => {
        store.replaceReducer(require('../reducers').default)
      });
    }
  }

  return {store, persistor}
}
