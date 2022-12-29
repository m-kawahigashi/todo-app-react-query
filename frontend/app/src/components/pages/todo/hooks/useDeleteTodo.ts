import { useCallback, useState } from "react"

import { useDispatch } from "react-redux"
import { DeleteTodoOperation } from "redux/operations/todoOperations"

export const useDeleteTodo = () => {

    const [ isError, setIsError ] = useState<boolean>(false)
    const dispatch = useDispatch()

    const handleDeleteTodo = useCallback( async(id: number) => {
        try {
                dispatch(DeleteTodoOperation(id))
            } catch (err) {
                setIsError(true)
                console.log(err)
            }
       }, [])


    return { handleDeleteTodo, isError }
}