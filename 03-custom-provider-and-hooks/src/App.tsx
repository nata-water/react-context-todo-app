import React, { createContext, useState } from "react";
import { TodoPage } from "./pages/TodoPage";
import {Todo, TodoProvider} from "./contexts/TodoContext";
import { v4 } from "uuid";

function App() {

  return (
    <div className="App">
      <TodoProvider>
        <TodoPage />
      </TodoProvider>
    </div>
  );
}

export default App;
