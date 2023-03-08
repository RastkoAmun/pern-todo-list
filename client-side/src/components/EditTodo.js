import { useState } from 'react'

const EditTodo = ({todo, getTodos}) => {
  const [description, setUpdatedDescription] = useState(`${todo.description}`)

  const handleInput = (event) => {
    setUpdatedDescription(event.target.value);
  }
  
  const updateTodo = async (event) => {
    event.preventDefault();
    try {
      const body = { description }
      await fetch(`http://localhost:8080/todos/${todo.id}`, {
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
      <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target={`#id${todo.id}`}>
        Edit
      </button>
      <div className="modal fade" id={`id${todo.id}`}tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Set new description</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setUpdatedDescription(todo.description)}></button>
            </div>
            <div className="modal-body">
              <input className="form-control" value={description} onChange={handleInput}/>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setUpdatedDescription(todo.description)}>Close</button>
              <button type="button" className="btn btn-warning" data-bs-dismiss="modal" onClick={updateTodo}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditTodo;