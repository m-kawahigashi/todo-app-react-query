import { useCallback, useState } from "react"
import { getTodos } from "lib/api/todos"
import { useDispatch } from "react-redux"
import { getTodoAction } from "redux/actions/TodoActions"

export const useGetTodo = () => {
    const [ isError, setIsError ] = useState<boolean>(false)

    const dispatch = useDispatch()

    const handleGetTodos = useCallback(async () => {
        try {
                const res = await getTodos()
                console.log(res)

                dispatch(getTodoAction(res.data.todos))

            } catch (err) {
                setIsError(true)
                console.log(err)
            }
    }, [])

    return { handleGetTodos, isError }

}