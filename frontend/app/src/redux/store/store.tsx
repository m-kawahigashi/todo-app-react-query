import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import { todoReducer } from "redux/reducers/todoReducer";
import thunk from "redux-thunk";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const RootReducer = combineReducers({
    todos: todoReducer,
})

export type RootState = ReturnType<typeof RootReducer>

const store = createStore(RootReducer, composeEnhancers(applyMiddleware(thunk)))
export default store