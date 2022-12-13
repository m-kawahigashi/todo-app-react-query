import { FC, memo } from "react"
import { Todo } from "interfaces/index"
import { useDeleteTodo } from "components/pages/todo/hooks/useDeleteTodo"

type DeleteTodoValueType = {
  todo: Todo
  setTodos: Function
}

export const TodoItem: FC<DeleteTodoValueType> = memo(({ todo, setTodos }) => {
  const { handleDeleteTodo, isError } = useDeleteTodo({ setTodos })

  return (
    <>
      <tr>
        <td>{todo.todo}</td>
        <td>
          <button onClick={() => handleDeleteTodo(todo.id || 0)}>削除</button>
        </td>
      </tr>

      {
        isError && <div style={{color: 'red'}}>Todoの削除に失敗しました</div>
      }
    </>
  )
})