import { useCallback, useState } from "react"
import { getTodos } from "lib/api/todos"
import { Todo } from "interfaces/index"

export const useGetTodo = () => {
    const [ todos, setTodos ] = useState<Todo[]>([])
    const [ isError, setIsError ] = useState<boolean>(false)

    const handleGetTodos = useCallback(async () => {
        try {
                const res = await getTodos()
                console.log(res)

                setTodos(res.data.todos)
                console.log(res.data.message)
            } catch (err) {
                setIsError(true)
                console.log(err)
            }
    }, [])

    return { handleGetTodos, isError, todos, setTodos } // setTodosを渡すのは良くないが一旦このまま進める
}