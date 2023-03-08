//Imported packages
const express = require('express');
const app = express();
const { Pool } = require('pg')
const cors = require('cors')
const PORT = 8080;

//Database connection
const pool = new Pool({
  connectionString: 'postgres://postgres:elephant@localhost/perntodo'
})

//Middleware
app.use(express.json())
app.use(cors());

//--------------------------------- ROUTING --------------------------------------
// ROUTING
//Get all todos (get request)
app.get('/todos', async(req, res) => {
  try{
    const allTodos = await pool.query('SELECT * FROM todos ORDER BY id');
    res.json(allTodos.rows);
  }catch(err){
    console.log(err.message);
  }
})

//Get a single todo
app.get('/todos/:id', async(req, res) => {
  const id = req.params.id;
  try{
    const todo = await pool.query('SELECT * FROM todos WHERE id=$1', [id]);
    res.json(todo.rows[0]);
  }catch(err){
    console.log(err.message);
  }
})

//Create a new todo (post request)
app.post('/todos', async(req, res) => {
  try{
    const { description } = req.body;
    const newTodo = await pool.query('INSERT INTO todos(description) VALUES ($1) RETURNING *', [description]);
    res.json(newTodo.rows);
  }catch(err) {
    console.error(err.message);
  }
})

//Edit a todo (put request)
app.put('/todos/:id', async(req, res) => {
  try {
    const id = req.params.id;
    const { description } = req.body;
    const updatedTodo = await pool.query('UPDATE todos SET description=$1 WHERE id=$2 RETURNING *', [description, id]);
    res.json(updatedTodo.rows);
  }catch(err){
    console.error(err.message)
  }
})

//Delete a todo (delete request)
app.delete('/todos/:id', async(req, res) => {
  try {
    const id = req.params.id;
    await pool.query('DELETE FROM todos WHERE id=$1', [id]);
    res.end();
  }catch(err){
    console.error(err.message);
  }
})

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
})


