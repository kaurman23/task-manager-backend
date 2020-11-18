const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express();
const port = process.env.port || 3000;

app.use(express.json())



//GET REQUESTS
app.get('/users',(req,res) => {
    User.find({})
        .then((result) => res.send(result))
        .catch((error) => res.status(500).send(error))
    
})

app.get('/users/:id',(req,res) => {
    const _id = req.params.id 
    User.findById(_id)
        .then((result) => {
            if(!result) return res.status(404).send()
            res.send(result)
        })
        .catch((error) => res.status(500).send(error))
})

app.get('/tasks',(req,res) => {
    Task.find({})
        .then((result) => res.send(result))
        .catch((error) => res.status(500).send(error))
})

app.get('/tasks/:id',(req,res) => {
    const _id = req.params.id 
    Task.findById(_id)
        .then((result) => {
            if(!result) return res.status(404).send()
            res.send(result)
        })
        .catch((error) => res.status(500).send(error))
})


//POST REQUESTS

app.post('/users',(req,res)=>{
    const newUser = new User(req.body);
    newUser.save()
        .then((result) => res.status(201).send(result))
        .catch((error) => res.status(400).send (error)) 
})

app.post('/tasks',(req,res) => {
    const newTask = new Task(req.body)
    newTask.save()
        .then((result) => res.status(201).send(result))
        .catch((error) => res.status(400).send (error)) 
})

app.listen(port,() => {
    console.log('Server is up and running')
})