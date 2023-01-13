import { FC, memo }  from "react"
import { TodoItem } from "./TodoItem"
import { Todo } from "interfaces/index"
import { useGetTodo } from "../hooks/useGetTodo"

export const TodoList: FC = memo(() => {
  const { todos, isLoading } = useGetTodo();

  if (isLoading) {
    return <>loading</>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Todo一覧</th>
        </tr>
      </thead>
      <tbody>
        {
          todos?.map((todo: Todo, index: number) => {
            return (
              <TodoItem
                key={index}
                todo={todo}
              />
            )
          })
        }
      </tbody>
    </table>
  )
})