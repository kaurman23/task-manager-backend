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


//PATCH ENDPOINTS
app.patch('/users/:id', async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','age','email','password']
    const valid = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if(!valid) return res.status(400).send();
     
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id,req.body, {new: true, runValidators: true})
        if(!updatedUser) return res.status(404).send()
        res.send(updatedUser)
    } catch(error) {
        res.status(400).send(error)
    }
})

app.patch('/tasks/:id', async (req,res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['desc','completed']
    const valid = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if(!valid){ 
        console.log("BItch")
        return res.status(400).send()}

    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id,req.body,{new: true, runValidators: true})
        if(!updatedTask) return res.status(404).send()
        res.send()
    } catch(error) {
        res.status(400).send(error)
    }
})


//Delete End points

app.delete('/users/:id', async (req,res) => {
    try{
        const delUser = await User.findByIdAndDelete(req.params.id)
        if(!delUser) return res.status(400).send()
        res.send(delUser)
    } catch(error) {
        res.status(500).send(error)
    }

})

app.delete('/tasks/:id', async (req,res) => {
    try{
        const delTask = await Task.findByIdAndDelete(req.params.id)
        if(!delTask) return res.status(400).send()
        res.send(delTask)
    } catch(error) {
        res.status(500).send(error)
    }
    
})

app.listen(port,() => {
    console.log('Server is up and running')
})


