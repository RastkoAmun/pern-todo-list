//Imported packages
const express = require('express');
const app = express();
const { Pool } = require('pg')
const cors = require('cors')
const PORT = 8080;

//Database connection
const pool = new Pool({
  connectionString: 'postgres://postgres:elephant@EL1441@localhost/perntodo'
})

//Middleware
app.use(express.json())
app.use(cors());

//--------------------------------- ROUTING --------------------------------------
// ROUTING
//Get all todos (get request)
app.get('/todos', async(req, res) => {
  try{
    const allTodos = await pool.query('SELECT * FROM todos');
    res.json(allTodos.rows);
  }catch(err){
    console.log(err.message);
  }
})

//Get a single todo
app.get('/todos/:id', async(req, res) => {
  const todo_id = req.params.id;
  try{
    const todo = await pool.query(`SELECT * FROM todos WHERE todo_id=$1`, [todo_id]);
    res.json(todo.rows[0]);
  }catch(err){
    console.log(err.message);
  }
})

//Create a new todo (post request)
app.post('/todos', async(req, res) => {
  try{
    const { todo_description } = req.body;
    console.log(todo_description);
    const newTodo = await pool.query('INSERT INTO todos(todo_description) VALUES ($1) RETURNING *', [todo_description]);
    
    res.json(newTodo.rows[0]);
  }catch(err) {
    console.error(err.message);
  }
})

//Edit a todo (put request)
app.put('/todos/:id', async(req, res) => {
  try {
    const id = req.params.id;
    const { todo_description } = req.body;
    const updatedTodo = await pool.query('UPDATE todos SET todo_description=$1 WHERE todo_id=$2 RETURNING *', [todo_description, id]);
    res.json(updatedTodo.rows[0]);
  }catch(err){
    console.error(err.message)
  }
})

//Delete a todo (delete request)
app.delete('/todos/:id', async(req, res) => {
  try {
    const id = req.params.id;
    const deletedTodo = await pool.query('DELETE FROM todos WHERE todo_id=$1', [id]);
    res.json('Todo deleted');
  }catch(err){
    console.error(err.message);
  }
})

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
})


