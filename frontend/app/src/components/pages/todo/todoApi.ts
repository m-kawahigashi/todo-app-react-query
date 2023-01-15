import { Todo } from "interfaces";
import { createTodo, getTodos, deleteTodo } from "lib/api/todos"

export const getTodoApi = async() => {
    const res = await getTodos();
    console.log(res);

    const data = res.data.todos;

    return data;
}

export const addTodoApi = async(addTodo: Todo) => {
    const res = await createTodo(addTodo);
    console.log(res);

    const data = [res.data.todos];

    return data;
}

export const deleteTodoApi = async(id: number) => {
    const res = await deleteTodo(id);
    console.log(res);

    const data = ((prev: Todo[]) => prev.filter((todo: Todo) => todo.id !== id));
    return data;
}