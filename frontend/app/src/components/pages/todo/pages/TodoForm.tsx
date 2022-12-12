import { FC, useState, useContext } from "react"
import { AuthContext } from "App"

import { createTodo } from "lib/api/todos"
import { Todo } from "interfaces/index"

interface TodoFormProps {
  todos: Todo[]
  setTodos: Function
}

export const TodoForm: FC<TodoFormProps> = ({ todos, setTodos }) => {
  const { currentUser } = useContext(AuthContext)
  const [ todo, setTodo ] = useState<string>("")

  const cuurentUserId: number | undefined = currentUser?.id

  const handleCreateTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data: Todo = {
      todo: todo,
      userId: cuurentUserId
    }

    try {
          const res = await createTodo(data)
          console.log(res)

          setTodos([...todos, res.data.todo])

          // console.log(setTodos)
          console.log(cuurentUserId)
    } catch (err) {
          console.log(err)
    }

    setTodo("")
  }

  return (
    <form onSubmit={handleCreateTodo}>
      <input
        type="text"
        value={todo}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setTodo(e.target.value)
        }}
      />
      <input type="submit" value="追加" disabled={!todo} />
    </form>
  )
}