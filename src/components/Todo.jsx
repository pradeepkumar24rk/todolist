import { useState } from "react";
import "./App.css";
import React from "react";

function App() {
  const [newitem, setNewitem] = useState("");
  const [items, setItems] = useState([]);
  const add = () => {
    const data = {
      id: Math.floor(Math.random() * 1000),
      value: newitem,
    };
    console.log(data);
    setItems((oldlist) => [...oldlist, data]);
    setNewitem("");
  };

  const deleteitem = (id) => {
    console.log(id);
    var newarray = items.filter((list) => list.id !== id);
    setItems(newarray);
  };

  return (
    <div className='App'>
      <h1>My Todo List</h1>

      <input
        type='text'
        placeholder='add items...'
        value={newitem}
        onChange={(e) => setNewitem(e.target.value)}
      />
      <button onClick={() => add()}>add</button>
      <ul>
        {items.map((list) => {
          return (
            <li key={list.id}>
              {list.value}
              <button onClick={() => deleteitem(list.id)}>❌</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
