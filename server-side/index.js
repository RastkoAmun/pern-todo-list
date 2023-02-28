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

//Create a new todo (post request)
app.post('/todos', async(req, res) => {
  try{
    const { todo_description } = req.body;
    console.log(todo_description);
    const newTodo = await pool.query('INSERT INTO todos(todo_description) VALUES ($1)', [todo_description]);
    
    res.json(newTodo);
  }catch(err) {
    console.error(err.message);
  }
})

//Edit a todo (patch request)

//Delete a todo (delete request)
// app.delete('/todos', async(req, res) => {
//   try {
//     const deletedTodo = await pool.query(`DELETE FROM todos WHERE todo_id=${todo_id}`);
//     res.json(deletedTodo);
//   }catch(err){
//     console.error(err.message);
//   }
// })

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
})


