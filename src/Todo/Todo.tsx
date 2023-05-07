import React, { useState, useReducer } from "react";

type Ttodo = {
  id: number;
  text: string;
  completed: boolean;
};

const handleAdd = "handleAdd";
const handleDelete = "handleDelete";
const handleComplete = "handleComplete";

type Tadd = {
  type: typeof handleAdd;
  payload: string;
};
type Tdelete = {
  type: typeof handleDelete;
  payload: number;
};
type Tcomplete = {
  type: typeof handleComplete;
  payload: number;
};

type Action = Tadd | Tdelete | Tcomplete;

const initialState: Ttodo[] = [];

const Todo: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [todos, dispatch] = useReducer((state: Ttodo[], action: Action) => {
    switch (action.type) {
      case "handleAdd":
        if (action.payload.trim() === "") {
          return state;
        } else {
          const newTodo: Ttodo = {
            id: Date.now(),
            text: action.payload,
            completed: false,
          };
          setInput("");
          return [...state, newTodo];
        }
      case "handleDelete":
        return state.filter((todo) => todo.id !== action.payload);
      case "handleComplete":
        return state.map((todo) => {
          if (todo.id === action.payload) {
            return { ...todo, completed: !todo.completed };
          }
          return todo;
        });
      default:
        return state;
    }
  }, []);

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
      <button onClick={() => dispatch({ type: handleAdd, payload: input })}>
        Add
      </button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              onClick={() =>
                dispatch({ type: handleComplete, payload: todo.id })
              }
              style={{
                textDecoration: todo.completed ? "line-through" : "",
                backgroundColor: todo.completed ? "green" : "",
              }}
            >
              {todo.text}
            </span>
            <span
              onClick={() => dispatch({ type: handleDelete, payload: todo.id })}
              style={{
                marginLeft: "15px",
                color: "red",
                fontSize: "25px",
                cursor: "pointer",
              }}
            >
              Delete
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
