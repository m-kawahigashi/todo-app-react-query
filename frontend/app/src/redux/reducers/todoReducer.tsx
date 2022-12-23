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
        // ...state,
        // ...action.payload
      }
    }
    case todoActionTypes.addTodo: {
      // return [...state, { todo: action.todo, completeflag: false, userId: action.userId }];
      return {
        todos: [
          ...state.todos,
          ...action.payload
        ]
      }

      // return [...state, ...action.todos];
    }
    // case 'ENDTASK': {
    //   return {
    //     todo: action.value,
    //   }
    // }
    // case 'UPDTASK': {
    //   return {
    //     todo: action.value,
    //   }
    // }
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