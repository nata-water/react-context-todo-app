import { createContext } from "react";

export interface Todo {
  id: string;
  contents: string;
  done: boolean;
}

export interface TodoContext {
  todoList: Todo[];
  addTodo?: any;
  toggleDoneTodo?: any;
  removeTodo?: any;
  updateTodo?: any;
}

// Context.Providerで値を提供するパターン
export const Context = createContext<TodoContext>({ todoList: [] });
