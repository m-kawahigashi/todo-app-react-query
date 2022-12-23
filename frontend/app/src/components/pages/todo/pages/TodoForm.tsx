import { FC, memo } from "react"
import { useCreateTodo } from "../hooks/useCreateTodo"

export const TodoForm: FC = memo(() => {
  const { handleCreateTodo, onChangeCreateTodo, todo, isError } = useCreateTodo()

  return (
    <>
      <form onSubmit={handleCreateTodo}>
        <input
          type="text"
          value={todo}
          name="todo"
          onChange={onChangeCreateTodo}
        />
        <input type="submit" value="追加" disabled={!todo} />
      </form>

      {
        isError && <div style={{color: 'red'}}>Todoの取得に失敗しました</div>
      }
    </>
  )
})