import { FC, memo }  from "react"
import { TodoItem } from "./TodoItem"
import { Todo } from "interfaces/index"

import { useSelector } from "react-redux"
import { RootState } from "redux/store/store"

export const TodoList: FC = memo(() => {
  const todos = useSelector((state: RootState) => state.todos)

  return (
    <table>
      <thead>
        <tr>
          <th>Todo一覧</th>
        </tr>
      </thead>
      <tbody>
        {
          todos.todos.map((todo: Todo, index: number) => {
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