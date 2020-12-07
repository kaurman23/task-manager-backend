const express = require('express')
const router = new express.Router()
const Task = require('../models/task')
const auth =require('../middleware/auth')
const { query } = require('express')

//GET
//GET /tasks/completed=true
//GET /tasks/limit=10&skip=20
//GET /tasks/sortBy=createdAt:desc
router.get('/tasks', auth, async (req,res) => {
    const match = { }
    const sort = { }

    if(req.query.completed)
    {
        match.completed = req.query.completed === "true"
    }

    if(req.query.sortBy)
    {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc'?-1:1
    }

    try {
       // const tasks = await Task.find({owner: req.user.id})
       await req.user.populate({
           path:'tasks',
           match,
           options: {
               limit: parseInt(req.query.limit),
               skip: parseInt(req.query.skip),
               sort
           }
       }).execPopulate()
        res.send(req.user.tasks)
    } catch(error) {
        res.status(500).send(error)
    }
})

router.get('/tasks/:id',auth, async (req,res) => {
    const _id = req.params.id 
    try {
        // const task = await Task.findById(_id)
        const task = await Task.findOne({_id,owner: req.user._id})
        
        if(!task) return res.status(404).send()
         
        res.send(task)
    } catch(errror) {
        res.send(error)
    }

})


//POST
router.post('/tasks',auth , async (req,res) => {
    //console.log(req.body);
    const task = new Task( {
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save();
        res.status(201).send(task)
    } catch(error) {
        res.status(400).send(error)
    }
})


//PATCH
router.patch('/tasks/:id', auth,  async (req,res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['desc','completed']
    const valid = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if(!valid){ 
        return res.status(400).send()}

    try {
        
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id})
      
        if(!task) return res.status(404).send()

        updates.forEach((update) => {
            return task[update] = req.body[update]
        })
        
        await task.save()

        res.send(task)

    } catch(error) {
        res.status(400).send(error)
    }
})


//DELETE
router.delete('/tasks/:id', auth, async (req,res) => {
    try{

        const delTask = await Task.findOneAndDelete({_id:req.params.id, owner: req.user._id})
        if(!delTask) return res.status(400).send()
        res.send(delTask)
    } catch(error) {
        res.status(500).send(error)
    }
    
})

module.exports = router