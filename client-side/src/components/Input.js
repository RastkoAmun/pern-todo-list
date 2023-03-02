import { useState } from 'react'

const Input = ({setTodos}) => {
  const [todo_description, setDescription] = useState("");

  const handleInput = (event) => {
    setDescription(event.target.value);
  }

  const addTodo = async (event) => {
    event.preventDefault();
    try {
      const newTodo = {todo_description};
      const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newTodo)
      }
      const response = await fetch('http://localhost:8080/todos', options);
      const res = await fetch('http://localhost:8080/todos');
      const jsonData = await res.json();
      setTodos(jsonData);
      setDescription("");
    }catch(err) {
      console.error(err.message);
    }
  }

  return(
    <div>
      <h2 className="text-center mt-5">Input Todo</h2>
      <form className="d-flex container-lg" onSubmit={addTodo}>
        <input type="text" className="form-control" value={todo_description} onChange={handleInput}></input>
        <button className="btn btn-success">Insert</button>
      </form>
    </div>
  )
}

export default Input;