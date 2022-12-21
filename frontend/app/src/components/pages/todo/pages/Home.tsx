import { FC, memo, useContext, useEffect } from "react"
import { TodoList } from "./TodoList"
import { TodoForm } from "./TodoForm"

import { AuthContext } from "App"
import { useGetTodo } from "../hooks/useGetTodo"
import { useSelector } from "react-redux"
import { RootState } from "redux/store/store"

const Home: FC = memo(() => {
  const { isSignedIn, currentUser } = useContext(AuthContext)
  const { handleGetTodos, isError, todos, setTodos } = useGetTodo()
  // const { handleGetTodos, isError } = useGetTodo()


  const selector = useSelector( (state: RootState) => state.todos )

  useEffect(() => {
    handleGetTodos()
    // 第二引数削除（一回だけレンダリングすればいいので(関数再生成で中身は一緒だがアドレス値が変わるため、無限ループが発生する)）
  }, [])

  console.log(selector)

  if (!isSignedIn || !currentUser) {
    return <h1>ログインできてないよー</h1>
  }

  return (
    <>
      <h1>こんにちは、 {currentUser?.name}さん！</h1>
      <TodoForm todos={todos} setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
      {/* <p>{selector}</p> */}
      {/* <TodoForm todos={selector} setTodos={setTodos} />
      <TodoList todos={selector} setTodos={setTodos} /> */}


      {
        isError && <div style={{color: 'red'}}>Todoの取得に失敗しました</div>
      }
    </>
  )
})

export default Home