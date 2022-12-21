import { useCallback, useState } from "react"
import { getTodos } from "lib/api/todos"
import { Todo } from "interfaces/index"
import { useSelector } from "react-redux"
import { RootState } from "redux/store/store"
import { useDispatch } from "react-redux"
import { getTodoAction } from "redux/actions/TodoActions"

export const useGetTodo = () => {
    const [ todos, setTodos ] = useState<Todo[]>([])
    const [ isError, setIsError ] = useState<boolean>(false)

    const selector = useSelector((state: RootState) => state.todos)
    const dispatch = useDispatch()

    const handleGetTodos = useCallback(async () => {
        try {
                const res = await getTodos()
                console.log(res)

                setTodos(res.data.todos)
                dispatch(getTodoAction(res.data.todos))

                // console.log(res.data.message)
                // console.log(selector)

            } catch (err) {
                setIsError(true)
                console.log(err)
            }
    }, [])

    return { handleGetTodos, isError, todos, setTodos } // setTodosを渡すのは良くないが一旦このまま進める
    // return { handleGetTodos, isError }

}