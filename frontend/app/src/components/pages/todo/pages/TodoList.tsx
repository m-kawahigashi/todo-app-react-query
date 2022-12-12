import { FC, memo }  from "react"
import { TodoItem } from "./TodoItem"
import { Todo, Todos } from "interfaces/index"

export const TodoList: FC<Todos> = memo(({ todos, setTodos }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Todo一覧</th>
        </tr>
      </thead>
      <tbody>
        {
          todos.map((todo: Todo, index: number) => {
            return (
              <TodoItem
                key={index}
                todo={todo}
                setTodos={setTodos}
              />
            )
          })
        }
      </tbody>
    </table>
  )
})