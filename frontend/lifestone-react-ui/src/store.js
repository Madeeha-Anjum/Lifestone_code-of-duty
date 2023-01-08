import { createStore, applyMiddleware } from 'redux';
import rootReducer from "./reducers/index";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import thunk from "redux-thunk";

export const store = createStore(rootReducer, applyMiddleware(thunk));

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const Persistor = () => {
    const store = createStore(
        persistedReducer,
        {},
        applyMiddleware(thunk)
      )
      
    let persistor = persistStore(store)
    return { store, persistor }
};

export default Persistor;