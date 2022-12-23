import { Action } from "redux";
import { todoActionTypes } from "../../actions/ActionTypes";


export interface Todo {
    id: number;
    todo: string;
    userId: number;
    isCompleted: boolean;
}
export type Todos = Todo[];

export interface StoreState {
    todos: Todos;
}

interface getTodoAction extends Action {
    type: typeof todoActionTypes.getTodo;
    payload: Todo[]
}

interface addTodoAction extends Action {
    type: typeof todoActionTypes.addTodo;
    payload: Todo[]
}

// interface updateTodoAction extends Action {
//     type: typeof todoActionTypes.updateTodo;
//     id: number;
//     todo: string;
// }

interface deleteTodoAction extends Action {
    type: typeof todoActionTypes.deleteTodo;
    payload: number
}

export type ActionTypes = getTodoAction | addTodoAction | deleteTodoAction