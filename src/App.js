import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import "./App.css";
import db from "./firebase";

function App() {
  function deleteTodo(e) {
    e.preventDefault();
    let index = e.target.value;

    todos.splice(index, 1);
    setTodos([...todos]);
    setCounter(counter - 1);
  }

  //React Hooks
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    db.collection("todos").onSnapshot((snapshot) => {
      setTodos(snapshot.docs.map((doc) => doc.data().title));
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    //setTodos([input.toUpperCase(), ...todos]);
    db.collection("todos").add({
      title: input,
    });

    setInput("");
    setCounter(counter + 1);
  };

  return (
    <div className="app">
      <h1>TO-DO APP</h1>

      <form>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="What do I have to do today?"
        />
        <p>
          <button
            disabled={!input}
            className="buttonAdd"
            type="submit"
            onClick={handleSubmit}
          >
            ADD
          </button>
        </p>
        <p>
          {counter === 0
            ? "Nothing to do today..."
            : counter === 1
            ? "You have " + counter + " TODO left..."
            : "You have " + counter + " TODO's left..."}
        </p>
        {todos.map((todo, index) => (
          <Todo
            title={todo}
            key={index}
            value={index}
            deleteTodo={deleteTodo}
          />
        ))}
      </form>
    </div>
  );
}

export default App;
