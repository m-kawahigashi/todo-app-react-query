import { FC, memo, useContext, useEffect } from "react"
import { TodoList } from "./TodoList"
import { TodoForm } from "./TodoForm"

import { AuthContext } from "App"
import { useGetTodo } from "../hooks/useGetTodo"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
// import { StoreState } from "redux/types/todo/types"
import { RootState } from "redux/store/store"
import { getTodo } from "redux/actions/TodoActions"


//RootState

const Home: FC = memo(() => {
  const { isSignedIn, currentUser } = useContext(AuthContext)
  const { handleGetTodos, isError, todos, setTodos } = useGetTodo()

  const selector = useSelector( (state: RootState) => state.todos )
  const dispatch = useDispatch()

  // console.log(selector)
  // console.log(dispatch)

  useEffect(() => {
    handleGetTodos()
    // dispatch(getTodo(todos))　// 無限ループ発生
  }, [ handleGetTodos ])

  // dispatch(getTodo(todos))　// 無限ループ発生
  console.log(selector)

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