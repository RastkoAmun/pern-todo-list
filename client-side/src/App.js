import { useState, useEffect } from 'react'
import Input from './components/Input'
import ListOfTodos from './components/ListOfTodos'
import './App.css'

function App() {
  const [allTodos, setAllTodos] = useState([]);

  const getTodos = async () => {
    try {
      const res = await fetch('http://localhost:8080/todos');
      const jsonData = await res.json();
      setAllTodos(jsonData);
    }catch(err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    getTodos();
  }, []);
  
  return (
    <div>
      <h1 className='text-center mt-5'>TODO LIST</h1>
      <Input getTodos={getTodos} />
      <ListOfTodos todos={allTodos} getTodos={getTodos}/>
    </div>
  );
}

export default App;
