import { useState, useContext, useCallback } from "react"
import { AuthContext } from "App"

import { createTodo } from "lib/api/todos"
import { Todo, Todos } from "interfaces/index"

export const useCreateTodo = ( todoFormValue: Todos ) => {
    const { currentUser } = useContext(AuthContext)
    const { todos, setTodos } = todoFormValue
    const [ todo, setTodo ] = useState<string>("")
    const [ isError, setIsError ] = useState<boolean>(false)
    const currentUserId: number | undefined = currentUser?.id

    const onChangeCreateTodo = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setTodo(e.target.value)
    }, [])

    const handleCreateTodo = useCallback( async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formElement = e.target as typeof e.target & {
            todo: {value: string};
        }
        setTodo(formElement.todo.value)

        const data: Todo = {
          todo: todo,
          userId: currentUserId
        }

        try {
              const res = await createTodo(data)
              console.log(res)

              setTodos([...todos, res.data.todo])
              console.log(currentUserId)
        } catch (err) {
              setIsError(true)
              console.log(err)
        }

        setTodo("")
    }, [ currentUserId, todo, todos, setTodos ])

    return { handleCreateTodo, onChangeCreateTodo, todo, isError }
}