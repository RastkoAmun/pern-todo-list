import EditTodo from "./EditTodo";

const ListOfTodos = ({todos, setTodos, getTodos}) => {
  
  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:8080/todos/${id}`, {
        method: "DELETE"
      })
      setTodos(todos.filter(todo => todo.todo_id !== id));
    }catch(err) {
      console.error(err.message)
    }
  }

  return(
    <div>
      <table className="table container container-lg text-center mt-5">
        <thead className="table-thead">
          <tr>
            <th>Todo Descritpiton</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {todos.map(todo => {
            return(
                <tr key={todo.todo_id}>
                  <td className='col col-10'>{todo.todo_description}</td>
                  <td className='col col-1'><EditTodo todo={todo} getTodos={getTodos}/></td>
                  <td className='col col-2'><button className='btn btn-danger' onClick={() => deleteTodo(todo.todo_id)}>Delete</button></td>
                </tr>)
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ListOfTodos;