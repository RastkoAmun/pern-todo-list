import { useState, useEffect } from 'react'
import Input from './components/Input'
import ListOfTodos from './components/ListOfTodos'

function App() {
  const [allTodos, setAllTodos] = useState([]);
  
  const hook = () => {

  }
  useEffect(hook, []);

  return (
    <div>
      <h1 className='text-center mt-5'>TODO LIST</h1>
      <Input />
    </div>
  );
}

export default App;
