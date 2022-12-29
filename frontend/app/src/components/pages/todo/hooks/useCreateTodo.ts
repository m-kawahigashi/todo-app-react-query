import { useState, useContext, useCallback } from "react"
import { AuthContext } from "App"

import { Todo } from "interfaces/index"
import { useDispatch } from "react-redux"
import { AddTodoOperation } from "redux/operations/todoOperations"

export const useCreateTodo = () => {

    const { currentUser } = useContext(AuthContext)
    const [ todo, setTodo ] = useState<string>("")
    const [ isError, setIsError ] = useState<boolean>(false)
    const currentUserId: number | undefined = currentUser?.id

    const dispatch = useDispatch()

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
              dispatch(AddTodoOperation(data))
              console.log(currentUserId)
        } catch (err) {
              setIsError(true)
              console.log(err)
        }

        setTodo("")
    }, [ currentUserId, todo ])


    return { handleCreateTodo, onChangeCreateTodo, todo, isError }
}