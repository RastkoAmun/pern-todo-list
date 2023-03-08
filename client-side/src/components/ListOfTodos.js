import EditTodo from "./EditTodo";
import DeleteTodo from "./DeleteTodo";

const ListOfTodos = ({todos, setTodos, getTodos}) => {
  
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
                <tr key={todo.id}>
                  <td className='col col-10'>{todo.description}</td>
                  <td className='col col-1'><EditTodo todo={todo} getTodos={getTodos}/></td>
                  <td className='col col-2'><DeleteTodo todo={todo} getTodos={getTodos}/></td>
                </tr>)
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ListOfTodos;