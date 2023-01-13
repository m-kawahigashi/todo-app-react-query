import { useCallback } from "react"
import { DeleteMutateTodo } from "./useMutateTodo"

export const useDeleteTodo = () => {

    const { deleteMutate } = DeleteMutateTodo();
    const isError = deleteMutate.isError;

    const handleDeleteTodo = useCallback( async(id: number) => {
        deleteMutate.mutate(id);
       }, [])

    return { handleDeleteTodo, isError }
}