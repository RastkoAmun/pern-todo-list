const DeleteTodo = ({todo, getTodos}) => {
  
  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:8080/todos/${id}`, {
        method: "DELETE"
      })
      getTodos();
    }catch(err) {
      console.error(err.message)
    }
  }

  return(
    <div>
      <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target={`#id-dlt${todo.id}`}>
        Delete
      </button>
      <div className="modal fade" id={`id-dlt${todo.id}`}tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Set new description</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
            </div>
            <div className="modal-body">
              Would you like to delete this todo?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteTodo;