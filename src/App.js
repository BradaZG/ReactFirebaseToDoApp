import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import "./App.css";
import db from "./firebase";

function App() {
  //React Hooks
  const [todos, setTodos] = useState([{}]);
  const [input, setInput] = useState("");
  const [counter, setCounter] = useState(9999);
  const [leng, setLeng] = useState(0);

  //setTodos(db.collection("todos"));

  useEffect(() => {
    db.collection("todos").onSnapshot((snapshot) => {
      setTodos(snapshot.docs.map((doc) => doc.data()));
      let count = snapshot.docs.map((doc) => doc.data().id);
      let arr = Object.values(count);
      setLeng(snapshot.docs.length);
      if (snapshot.docs.length > 0) {
        setCounter(Math.min(...arr) - 1);
      }
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (counter <= 9999 && counter > 3999) {
      //setTodos([input.toUpperCase(), ...todos]);
      db.collection("todos").doc(counter.toString()).set({
        title: input.toUpperCase(),
        id: counter,
      });
      //setCounter(counter - 1);
      setInput("");
    } else {
      alert(
        "ToDo list full! Finish & delete some things before adding new ones..."
      );
    }
  };

  function deleteTodo(e) {
    e.preventDefault();
    let index = e.target.id;

    db.collection("todos").doc(index).delete();
    //todos.splice(index, 1);
    //setTodos([...todos]);
    //setCounter(counter + 1);
  }

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
          {leng === 0
            ? "Nothing to do today..."
            : leng === 1
            ? "You have " + (0 + leng) + " TODO left..."
            : "You have " + (0 + leng) + " TODO's left..."}
        </p>
        {todos.map((todo, index) => (
          <Todo
            title={todo.title}
            id={todo.id}
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
