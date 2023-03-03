import { useState } from 'react'

const EditTodo = ({todo, getTodos}) => {
  const [todo_description, setUpdatedDescription] = useState(`${todo.todo_description}`)

  const handleInput = (event) => {
    setUpdatedDescription(event.target.value);
  }
  
  const updateTodo = async (event) => {
    event.preventDefault();
    try {
      const body = { todo_description }
      const updateTodo = await fetch(`http://localhost:8080/todos/${todo.todo_id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      })
      getTodos();
    }catch(err) {
      console.error(err.message)
    }
  }

  return(
    <div>
      <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target={`#id${todo.todo_id}`}>
        Edit
      </button>
      <div className="modal fade" id={`id${todo.todo_id}`}tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Set new description</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setUpdatedDescription(todo.todo_description)}></button>
            </div>
            <div className="modal-body">
              <input className="form-control" value={todo_description} onChange={handleInput}/>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setUpdatedDescription(todo.todo_description)}>Close</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={updateTodo}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditTodo;