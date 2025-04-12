import { PERSIST_STORE_NAME } from '../constants/App'
import rootReducer from './rootReducer'
import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const middlewares = []

const persistConfig = {
  key: PERSIST_STORE_NAME,
  keyPrefix: '',
  storage,
  whitelist: ['auth', 'cart']
}

const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer()),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(middlewares),
  devTools: process.env.NODE_ENV === 'development',
})

store.asyncReducers = {}

export const persistor = persistStore(store)

export const injectReducer = (key, reducer) => {
  if (store.asyncReducers[key]) {
    console.log("revieced reducer")
    return false
  }
  console.log("rejected reducer")

  store.asyncReducers[key] = reducer
  store.replaceReducer(persistReducer(persistConfig, rootReducer(store.asyncReducers)))
  persistor.persist()
  return store
}

export default store