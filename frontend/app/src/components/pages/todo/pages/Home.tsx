import { FC, memo, useContext, useEffect } from "react"
import { TodoList } from "./TodoList"
import { TodoForm } from "./TodoForm"

import { AuthContext } from "App"
import { useGetTodo } from "../hooks/useGetTodo"

const Home: FC = memo(() => {
  const { isSignedIn, currentUser } = useContext(AuthContext)
  const { handleGetTodos, isError, todos, setTodos } = useGetTodo()

  useEffect(() => {
    handleGetTodos()
  }, [ handleGetTodos ])

  if (!isSignedIn || !currentUser) {
    return <h1>ログインできてないよー</h1>
  }

  return (
    <>
      <h1>こんにちは、 {currentUser?.name}さん！</h1>
      <TodoForm todos={todos} setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />

      {
        isError && <div style={{color: 'red'}}>Todoの取得に失敗しました</div>
      }
    </>
  )
})

export default Home