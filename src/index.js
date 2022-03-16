const express = require('express');
const cors = require('cors');
const {v4:uuidv4} = require('uuid')

// const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const {username} = request.headers;
  const user = users.find(user=>user.username === username)
  //if username not exist return erro 404
  if(!user)return response.status(404).json({error:"user not found!"});
  request.user = user;
  next()
}

//create user
app.post('/users', (request, response) => {
  // Complete aqui
  const {name, username} = request.body;
  const usernameResult = users.find(user=>user.username === username);
  //verify if user already exist
  if(usernameResult)return response.status(400).json({error:'Username already exist!'});
  const user = {
    id:uuidv4(),
    name,
    username,
    todos:[]
  } 
  users.push(user)
  return response.status(201).json(user)


});

//search user todos
app.get('/todos',checksExistsUserAccount,(request, response) => {
  const {user} = request;  
  return response.json(user.todos)
});


//create todo
app.post('/todos', checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const {title, deadline} = request.body;

  const todo = {
    id:uuidv4(),
    title,
    done:false,
    deadline:new Date(deadline),
    created_at: new Date(),
  }

  user.todos.push(todo)
  return response.status(201).json(todo)
});

//Update todo values
app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  const {user} = request;
  const {title, deadline} = request.body;
  const {id} = request.params;
  const todo =  user.todos.find(todo=>todo.id === id)
  if(!todo)return response.status(404).json({error:"Todo id not exist!"});

  todo.title = title;
  todo.deadline = new Date(deadline)
  return response.status(201).json(todo)
});

//
app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  const {user} = request;
  const {id} = request.params;
  const todo =  user.todos.find(todo=>todo.id === id)
  if(!todo)return response.status(404).json({error:"Todo id not exist!"});
  todo.done = true;
  return response.json(todo)
});

//delete todo by id
app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
    const {user} = request;
    const {id} = request.params;
    const todo = user.todos.findIndex(item=>item.id === id)
    if(todo === -1)return response.status(404).json({error:"Todo not found"});
    user.todos.splice(todo, 1)
    return response.status(204).send()
});

module.exports = app;