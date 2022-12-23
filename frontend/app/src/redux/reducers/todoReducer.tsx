import { todoActionTypes } from "redux/actions/ActionTypes"
import { ActionTypes, Todo, StoreState } from "redux/types/todo/types"
import { todoInitialState } from "redux/store/initialState"


export const todoReducer = ( state: StoreState = todoInitialState, action: ActionTypes ): StoreState => {
  switch (action.type) {
    case todoActionTypes.getTodo: {
      return {
        todos: [
          ...state.todos,
          ...action.payload
        ]
      }
    }
    case todoActionTypes.addTodo: {
      return {
        todos: [
          ...state.todos,
          ...action.payload
        ]
      }
    }
    case todoActionTypes.deleteTodo: {
      return {
        todos: state.todos.filter( (todo: Todo) => todo.id !== action.payload )
      }
    }
    default: {
      return state
    }
  }
}