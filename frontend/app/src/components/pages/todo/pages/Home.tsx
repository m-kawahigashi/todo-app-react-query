import React, { FC, useContext, useState, useEffect } from "react"
import { TodoList } from "./TodoList"
import { TodoForm } from "./TodoForm"

import { getTodos } from "lib/api/todos"
import { Todo } from "interfaces/index"

import { AuthContext } from "App"

const Home: FC = () => {
  const { isSignedIn, currentUser } = useContext(AuthContext)
  const [todos, setTodos] = useState<Todo[]>([])

  const handleGetTodos = async () => {
    try {
      const res = await getTodos()
      console.log(res)

        setTodos(res.data.todos)
        console.log(res.data.message)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    handleGetTodos()
  }, [])

  if (!isSignedIn || !currentUser) {
    return <h1>ログインできてないよー</h1>
  }

  return (
    <>
      <h1>こんにちは、 {currentUser?.name}さん！</h1>
      <TodoForm todos={todos} setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </>
  )
}

export default Home