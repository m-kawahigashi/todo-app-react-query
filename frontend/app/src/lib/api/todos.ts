import client from "./client"
import Cookies from "js-cookie"
import { Todo } from "../../interfaces/index"
import { ITodosApiType } from "components/pages/todo/types"

// todoの一覧を取得
export const getTodos = () => {
  return client.get<ITodosApiType>("/todos", { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }})
}

// todoの新規作成
export const createTodo = (data: Todo) => {
  return client.post<ITodosApiType>("/todos", data)
}

// todoの更新
export const updateTodo = (id: number, data: Todo) => {
    return client.patch(`/todos/${id}`, data)
  }

// todoの削除
export const deleteTodo = (id: number) => {
  return client.delete<ITodosApiType>(`/todos/${id}`)
}