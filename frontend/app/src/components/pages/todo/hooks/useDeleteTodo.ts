import { useCallback, useState } from "react"

import { deleteTodo } from "lib/api/todos"
import { Todo } from "interfaces/index"

type DeleteTodoType = {
    setTodos: Function
}

export const useDeleteTodo = ( deleteTodoValue: DeleteTodoType ) => {
    const { setTodos } = deleteTodoValue
    const [ isError, setIsError ] = useState<boolean>(false)

    const handleDeleteTodo = useCallback( async(id: number) => {
        try {
                const res = await deleteTodo(id)
                console.log(res)

                setTodos((prev: Todo[]) => prev.filter((todo: Todo) => todo.id !== id))
            } catch (err) {
                setIsError(true)
                console.log(err)
            }
       }, [ setTodos ])

    return { handleDeleteTodo, isError }
}