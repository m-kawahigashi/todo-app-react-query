import { getTodos, createTodo, deleteTodo } from "lib/api/todos"
import { getTodoAction, addTodoAction, deleteTodoAction } from "redux/actions/TodoActions"

import { Todo } from "interfaces/index"
import { RootState } from "redux/store/store"
import { Dispatch, ActionCreator } from "redux";
import { ActionTypes } from "redux/types/todo/types";
import { ThunkAction } from "redux-thunk";

export const GetTodoOperation: ActionCreator<ThunkAction<void, RootState, undefined, ActionTypes>> = () => { //ActionTypesは基本的にはどのアクションを呼び出した方がいいか明示的に指定する方が良い
    return async (dispatch: Dispatch) => {

        const res = await getTodos()
        console.log(res)

        dispatch(getTodoAction(res.data.todos))
    }
}

export const AddTodoOperation: ActionCreator<ThunkAction<void, RootState, undefined, ActionTypes>> = (data: Todo) => {
    return async (dispatch: Dispatch) => {
        const res = await createTodo(data)
        console.log(res)

        dispatch(addTodoAction([res.data.todo]))
    }
}

export const DeleteTodoOperation: ActionCreator<ThunkAction<void, RootState, undefined, ActionTypes>> = (id: number) => {
    return async (dispatch: Dispatch) => {
        const res = await deleteTodo(id)
        console.log(res)

        dispatch( deleteTodoAction(id))
    }
}