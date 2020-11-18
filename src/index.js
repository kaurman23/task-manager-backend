const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express();
const port = process.env.port || 3000;

app.use(express.json())



//GET REQUESTS
app.get('/users',async (req,res) => {
    try{
        const users = await User.find({})
        res.send(users)
    } catch(error) {
        res.status(500).send(error)
    }
    
})

app.get('/users/:id',async (req,res) => {
    const _id = req.params.id 
    try {
        const user = await User.findById(_id)
        if(!user) return res.status(404).send()
        res.send(user)
    } catch(error) {
        res.status(500).send(error)
    }
})

app.get('/tasks', async (req,res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch(error) {
        res.status(500).send(error)
    }
})

app.get('/tasks/:id',async (req,res) => {
    const _id = req.params.id 
    try {
        const task = await Task.findById(_id)
        if(!task) return res.status(404).send()
         res.send(task)
    } catch(errror) {
        res.send(error)
    }
})


//POST REQUESTS

app.post('/users', async (req,res)=>{
    const newUser = new User(req.body);
    
    try {
        await newUser.save();
        res.status(201).send(newUser)
    }
    catch(error)
    {
        res.status(400).send (error)
    }
})

app.post('/tasks',async (req,res) => {
    const newTask = new Task(req.body)
    try {
        await newTask.save();
        res.status(201).send(newTask)
    } catch(error) {
        res.status(400).send (error)
    }
})

app.listen(port,() => {
    console.log('Server is up and running')
})