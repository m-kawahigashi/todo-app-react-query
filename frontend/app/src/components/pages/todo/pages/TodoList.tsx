import { FC }  from "react"
import { TodoItem } from "./TodoItem"
import { Todo } from "interfaces/index"

interface TodoListProps {
  todos: Todo[]
  setTodos: Function
}

export const TodoList: FC<TodoListProps> = ({ todos, setTodos }) => {
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
}