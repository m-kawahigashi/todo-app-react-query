import client from "./client"
import Cookies from "js-cookie"
import { Todo } from "../../interfaces/index"

// todoの一覧を取得
export const getTodos = () => {
  return client.get("/todos", { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }})
}

// todoの新規作成
export const createTodo = (data: Todo) => {
  return client.post("/todos", data)
}

// todoの更新
export const updateTodo = (id: number, data: Todo) => {
    return client.patch(`/todos/${id}`, data)
  }

// todoの削除
export const deleteTodo = (id: number) => {
  return client.delete(`/todos/${id}`)
}