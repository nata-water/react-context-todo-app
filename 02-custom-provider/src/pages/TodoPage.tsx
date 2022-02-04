import { TodoContext } from "../contexts/TodoContext";
import { useContext, useState } from "react";

export const TodoPage = () => {
  const { todoList, addTodo, removeTodo, toggleDoneTodo, updateTodo } =
    useContext(TodoContext);
  const [todo, setTodo] = useState<string>("");
  return (
    <>
      <h1>TODO内容</h1>
      <div>
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.currentTarget.value)}
          onKeyPress={(e) => {
            if (e.code === "Enter") {
              addTodo(todo);
            }
          }}
        />
        <button onClick={(e) => addTodo(todo)}>追加</button>
      </div>

      <h1>TODOリスト</h1>
      {todoList &&
        todoList.map((todo) => (
          <>
            <div>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={(e) => toggleDoneTodo(todo.id)}
              />
              {todo.done ? (
                <span style={{ textDecoration: "line-through" }}>
                  <input
                    style={{ border: "none", backgroundColor: "#999" }}
                    type="text"
                    value={todo.contents}
                    onChange={(e) => updateTodo(todo.id, e.currentTarget.value)}
                  />
                </span>
              ) : (
                <span>
                  <input
                    type="text"
                    value={todo.contents}
                    onChange={(e) => updateTodo(todo.id, e.currentTarget.value)}
                  />
                </span>
              )}
              <span>
                <button onClick={(e) => removeTodo(todo.id)}>削除</button>
              </span>
            </div>
          </>
        ))}
    </>
  );
};
