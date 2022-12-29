import { FC, memo } from "react"
import { Todo } from "interfaces/index"
import { useDeleteTodo } from "components/pages/todo/hooks/useDeleteTodo"

type DeleteTodoValueType = {
  todo: Todo
}

export const TodoItem: FC<DeleteTodoValueType> = memo(({ todo }) => {
  const { handleDeleteTodo, isError } = useDeleteTodo()

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