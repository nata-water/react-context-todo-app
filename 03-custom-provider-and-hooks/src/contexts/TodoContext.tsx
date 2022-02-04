import { createContext, useContext, useState } from "react";
import { ReactNode } from "react";
import { v4 } from "uuid";

export interface Todo {
  id: string;
  contents: string;
  done: boolean;
}

export interface TodoContextInterface {
  todoList: Todo[];
  addTodo?: any;
  toggleDoneTodo?: any;
  removeTodo?: any;
  updateTodo?: any;
}

interface Props {
  children: ReactNode;
}
export const TodoContext = createContext<TodoContextInterface>({
  todoList: [],
});

export function TodoProvider({ children }: Props) {
  // hooksを定義して提供するパターン

  // Todoデータ
  const [todoList, setTodoList] = useState<Todo[]>([]);

  // Todo追加操作
  const addTodo = (contents: string) =>
    // おそらくこの前に永続化
    setTodoList([
      ...todoList,
      {
        contents,
        id: v4(),
        done: false,
      },
    ]);
  // Todo削除操作
  const removeTodo = (id: string) =>
    setTodoList(todoList.filter((todo) => todo.id !== id));

  const toggleDoneTodo = (id: string) =>
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  // Todo更新操作
  const updateTodo = (id: string, contents: string) =>
    setTodoList(
      todoList.map((todo) => (todo.id === id ? { ...todo, contents } : todo))
    );

  // コンテキストプロバイダーをラップ
  return (
    <TodoContext.Provider
      value={{ todoList, addTodo, removeTodo, toggleDoneTodo, updateTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
}

// hooksの定義
export const useTodo = () => useContext(TodoContext);
