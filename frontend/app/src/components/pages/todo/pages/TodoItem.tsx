import { FC } from "react"
import { deleteTodo } from "lib/api/todos"
import { Todo } from "interfaces/index"

interface TodoItemProps {
  todo: Todo
  setTodos: Function
}

export const TodoItem: FC<TodoItemProps> = ({ todo, setTodos }) => {
  const handleDeleteTodo = async (id: number) => {
    try {
          const res = await deleteTodo(id)
          console.log(res)

          setTodos((prev: Todo[]) => prev.filter((todo: Todo) => todo.id !== id))
    } catch (err) {
          console.log(err)
    }
  }

  return (
    <tr>
      <td>{todo.todo}</td>
      <td>
        <button onClick={() => handleDeleteTodo(todo.id || 0)}>削除</button>
      </td>
    </tr>
  )
}