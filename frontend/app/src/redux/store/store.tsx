import { combineReducers, createStore } from "redux";
import { todoReducer } from "redux/reducers/todoReducer";

const RootReducer = combineReducers({
    todos: todoReducer,
})

export type RootState = ReturnType<typeof RootReducer>

const store = createStore(RootReducer)
export default store