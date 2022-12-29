import { useCallback, useState } from "react"
import { useDispatch } from "react-redux"
import { GetTodoOperation } from "redux/operations/todoOperations"

export const useGetTodo = () => {
    const [ isError, setIsError ] = useState<boolean>(false)

    const dispatch = useDispatch()

    const handleGetTodos = useCallback(async () => {
        try {
                // dispatch(GetTodoOperation() as unknown as any) //⇦引数のGetTodoOperation()でエラー発生　※型が合ってない？？型合ってなかったので一旦anyで
                dispatch(GetTodoOperation())

            } catch (err) {
                setIsError(true)
                console.log(err)
            }
    }, [])

    return { handleGetTodos, isError }

}