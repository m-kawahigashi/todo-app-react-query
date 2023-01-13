import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getTodoApi } from "../todoApi";

export const useGetTodo = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['todos'],
        queryFn: getTodoApi,
        onError: (err: AxiosError) => {
            console.log(err);
        },
        staleTime: Infinity,
    });

    return {
        todos: data,
        isLoading,
        isError
    };
}