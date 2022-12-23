import { useCallback, useState } from "react"

import { deleteTodo } from "lib/api/todos"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "redux/store/store"
import { deleteTodoAction } from "redux/actions/TodoActions"

export const useDeleteTodo = () => {

    const [ isError, setIsError ] = useState<boolean>(false)

    const selector = useSelector((state: RootState) => state.todos)
    const dispatch = useDispatch()

    const handleDeleteTodo = useCallback( async(id: number) => {
        try {
                const res = await deleteTodo(id)
                console.log(res)

                dispatch( deleteTodoAction(id) )
                console.log(selector)

            } catch (err) {
                setIsError(true)
                console.log(err)
            }
       }, [])


    return { handleDeleteTodo, isError }
}