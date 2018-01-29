import configureStore from './configure-store'

const {store, persistor} = configureStore();

export const STORE = store;
export const PERSISTOR = persistor;
