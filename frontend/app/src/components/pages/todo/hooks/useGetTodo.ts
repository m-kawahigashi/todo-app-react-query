import { useCallback, useState } from "react"
import { getTodos } from "lib/api/todos"
import { useDispatch } from "react-redux"
import { getTodoAction } from "redux/actions/TodoActions"
import { GetTodoOperation } from "redux/operations/todoOperations"

export const useGetTodo = () => {
    const [ isError, setIsError ] = useState<boolean>(false)

    const dispatch = useDispatch()

    const handleGetTodos = useCallback(async () => {
        try {
                const res = await getTodos()
                console.log(res)

                dispatch(getTodoAction(res.data.todos))

                GetTodoOperation() //⇦ではOperationが読み込まれていない？？（stateの中身が０件　※非同期処理が走ってない）
                // GetTodoOperation({setIsError}) //⇦ではOperationが読み込まれていない？？（stateの中身が０件　※非同期処理が走ってない）

                // dispatch(GetTodoOperation()) //⇦では引数のGetTodoOperation()でエラー発生　※型が合ってない？？

            } catch (err) {
                setIsError(true)
                console.log(err)
            }
    }, [])

    return { handleGetTodos, isError }

}