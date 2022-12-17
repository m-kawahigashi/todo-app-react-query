import { Action } from "redux";
import { todoActionTypes } from "../../actions/ActionTypes";

// export type Todo = {
//     todo : string
// }

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
    // todo: string;
    // userId: number;
    // isCompleted: boolean;
}

interface addTodoAction extends Action {
    type: typeof todoActionTypes.addTodo;
    payload: Todo[]
    // todo: string;
    // userId: number;
    // isCompleted: boolean;
}

// interface updateTodoAction extends Action {
//     type: typeof todoActionTypes.updateTodo;
//     id: number;
//     todo: string;
// }

interface deleteTodoAction extends Action {
    type: typeof todoActionTypes.deleteTodo;
    // id: number;
    payload: number
}

export type ActionTypes = getTodoAction | addTodoAction | deleteTodoAction