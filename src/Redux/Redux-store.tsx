import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import createSagaMiddleware from 'redux-saga';
// import { watchLoadData } from "./Redux-Saga/saga-repositories-page";
import repositoiresPageReducer from "./Reducers/repositoiresPageReducer";

const reducers = combineReducers({
    repositoriesPage: repositoiresPageReducer
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

// sagaMiddleware.run(watchLoadData)

// window.store = store;

export default store;