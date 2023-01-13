import { useState, useContext, useCallback } from "react"
import { AuthContext } from "App"

import { Todo } from "interfaces/index"
import { AddMutateTodo } from "./useMutateTodo"

export const useCreateTodo = () => {

    const { currentUser } = useContext(AuthContext)
    const [ todo, setTodo ] = useState<string>("")
    const currentUserId: number | undefined = currentUser?.id
    const { addMutate } = AddMutateTodo();
    const isError = addMutate.isError;

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

        addMutate.mutate(data);

        setTodo("")
    }, [ currentUserId, todo ])


    return { handleCreateTodo, onChangeCreateTodo, todo, isError }
}