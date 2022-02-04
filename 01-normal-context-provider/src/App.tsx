import React, { createContext, useState } from "react";
import { TodoPage } from "./pages/TodoPage";
import { Context, Todo } from "./contexts/TodoContext";
import { v4 } from "uuid";

function App() {
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
    setTodoList(
      todoList.filter((todo) => todo.id !== id)
    )

  const toggleDoneTodo = (id: string) =>
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  const updateTodo = (id: string, contents: string) =>
    setTodoList(
      todoList.map((todo) => todo.id === id ? {...todo, contents} : todo)
    )

  return (
    <div className="App">
      <Context.Provider value={{ todoList, addTodo, removeTodo, toggleDoneTodo, updateTodo }}>
        <TodoPage />
      </Context.Provider>
    </div>
  );
}

export default App;
