import { FC, memo } from "react"

import { Todos } from "interfaces/index"
import { useCreateTodo } from "../hooks/useCreateTodo"

export const TodoForm: FC<Todos> = memo(({ todos, setTodos }) => {
  const { handleCreateTodo, onChangeCreateTodo, todo, isError } = useCreateTodo({ todos, setTodos })

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