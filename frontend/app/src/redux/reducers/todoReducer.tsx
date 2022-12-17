import { todoActionTypes } from "redux/actions/ActionTypes"
import { ActionTypes } from "redux/types/todo/types"
import { todoInitialState } from "redux/store/initialState"

export const todoReducer = ( state = todoInitialState, action: ActionTypes ) => {
  switch (action.type) {
    case todoActionTypes.getTodo: {
      // return [...state, { todo: action.todo, completeflag: false, userId: action.userId }];
      return {
        // ...state,
        ...action.payload
      }
    }
    case todoActionTypes.addTodo: {
      // return [...state, { todo: action.todo, completeflag: false, userId: action.userId }];
      return {
        todos: [
          ...state,
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
       todos: state.filter( (todo) => todo.id !== action.payload )
      }
    }
    default: {
      return state
    }
  }
}