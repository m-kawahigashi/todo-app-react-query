import { FC, memo, useContext } from "react"
import { TodoList } from "./TodoList"
import { TodoForm } from "./TodoForm"

import { AuthContext } from "App"
import { useGetTodo } from "../hooks/useGetTodo"

const Home: FC = memo(() => {
  const { isSignedIn, currentUser } = useContext(AuthContext)
  const { todos, isError } = useGetTodo();

  console.log("Home.tsx console start")
  console.log(todos)
  console.log("Home.tsx console end")

  if (!isSignedIn || !currentUser) {
    return <h1>ログインできてないよー</h1>
  }

  return (
    <>
      <h1>こんにちは、 {currentUser?.name}さん！</h1>
      <TodoForm />
      <TodoList />

      {
        isError && <div style={{color: 'red'}}>Todoの取得に失敗しました</div>
      }
    </>
  )
})

export default Home