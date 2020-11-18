const express = require('express')
const router = new express.Router()
const Task = require('../models/task')


//GET
router.get('/tasks', async (req,res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch(error) {
        res.status(500).send(error)
    }
})

router.get('/tasks/:id',async (req,res) => {
    const _id = req.params.id 
    try {
        const task = await Task.findById(_id)
        if(!task) return res.status(404).send()
         res.send(task)
    } catch(errror) {
        res.send(error)
    }
})


//POST
router.post('/tasks',async (req,res) => {
    const newTask = new Task(req.body)
    try {
        await newTask.save();
        res.status(201).send(newTask)
    } catch(error) {
        res.status(400).send (error)
    }
})


//PATCH
router.patch('/tasks/:id', async (req,res) => {
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


//DELETE
router.delete('/tasks/:id', async (req,res) => {
    try{
        const delTask = await Task.findByIdAndDelete(req.params.id)
        if(!delTask) return res.status(400).send()
        res.send(delTask)
    } catch(error) {
        res.status(500).send(error)
    }
    
})

module.exports = router