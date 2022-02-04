import { createContext, useState } from "react";
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
  // カスタムプロバイダーで値を提供するパターン

  const [todoList, setTodoList] = useState<Todo[]>([]);
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

  const removeTodo = (id: string) =>
    setTodoList(todoList.filter((todo) => todo.id !== id));

  const toggleDoneTodo = (id: string) =>
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  const updateTodo = (id: string, contents: string) =>
    setTodoList(
      todoList.map((todo) => (todo.id === id ? { ...todo, contents } : todo))
    );

  return (
    <TodoContext.Provider
      value={{ todoList, addTodo, removeTodo, toggleDoneTodo, updateTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
}
