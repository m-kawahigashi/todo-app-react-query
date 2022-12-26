import { useState } from "react"
import { getTodos } from "lib/api/todos"
import { useDispatch } from "react-redux"
import { getTodoAction } from "redux/actions/TodoActions"
import { ThunkAction } from "redux-thunk";
import { todoActionTypes } from "redux/actions/ActionTypes";
import { RootState } from "redux/store/store"
import { Dispatch, Action } from "redux";
import { GetTodoAction, ActionTypes } from "redux/types/todo/types";
import { ThunkDispatch, ThunkActionDispatch } from "redux-thunk";

export const GetTodoOperation = () => {
    return async (dispatch: ThunkDispatch<RootState, unknown, ActionTypes>)=> {
    // return async () => {
        // const dispatch = useDispatch()

        const res = await getTodos()
        console.log(res)

       return dispatch(getTodoAction(res.data.todos))
        // const todos = res.data.todos
        // console.log(state)
    }
}

// type IsErroeType = {
//     setIsError: Function
// }

// export const GetTodoOperation = ({setIsError}: IsErroeType) => {
//     // const [ isError, setIsError ] = useState<boolean>(false)

//     return async (dispatch: Dispatch<ActionTypes>) => {
//         try {
//             const res = await getTodos()
//             console.log(res)

//             dispatch(getTodoAction(res.data.todos))

//             // GetTodoOperation() //⇦ではOperationが読み込まれていない？？（stateの中身が０件　※非同期処理が走ってない）
//             // dispatch(GetTodoOperation()) //⇦では引数のGetTodoOperation()でエラー発生　※型が合ってない？？

//         } catch (err) {
//             setIsError(true)
//             console.log(err)
//         }

//         // const dispatch = useDispatch()

//         const res = await getTodos()
//         // console.log(res)

//         dispatch(getTodoAction(res.data.todos))
//         // const todos = res.data.todos
//         // console.log(state)
//     }
// }

// export const GetTodoOperation = (): ThunkAction<
// void,
// RootState,
// undefined,
// ActionTypes
// > => async (dispatch: Dispatch<Action>) => {

//         // const dispatch = useDispatch()

//         const res = await getTodos()
//         // console.log(res)

//         dispatch(getTodoAction(res.data.todos))
//         // const todos = res.data.todos
//         // console.log(state)
// }