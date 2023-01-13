import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { addTodoApi, deleteTodoApi } from "../todoApi"

export const AddMutateTodo = (() => {
    const queryClient = useQueryClient();
    const addMutate = useMutation({
        mutationFn: addTodoApi,
        // onSuccess: () => form.reset(), // フォームをリセット（空）に設定できるらしいので設定したい
        onError: (err: AxiosError) => {
            console.log(err);
        },
        onSettled: () => {
            queryClient.invalidateQueries(['todos']);
        },
        retry: 0,
    });
    return { addMutate };
});

export const DeleteMutateTodo = (() => {
    const queryClient = useQueryClient();
    const deleteMutate = useMutation({
        mutationFn: deleteTodoApi,
        onError: (err: AxiosError) => {
            console.log(err);
        },
        onSettled: ()=> {
            queryClient.invalidateQueries(['todos']);
        },
        retry: 0,
    })
    return { deleteMutate };
});