const express = require('express')
const router = new express.Router()
const User = require('../models/user')


//GET
router.get('/users',async (req,res) => {
    try{
        const users = await User.find({})
        res.send(users)
    } catch(error) {
        res.status(500).send(error)
    }
    
})

router.get('/users/:id',async (req,res) => {
    const _id = req.params.id 
    try {
        const user = await User.findById(_id)
        if(!user) return res.status(404).send()
        res.send(user)
    } catch(error) {
        res.status(500).send(error)
    }
})


//POST
router.post('/users', async (req,res)=>{
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

router.post('/users/login', async (req,res) => {
    try {
        const user = await User.findByCredential(req.body.email,req.body.password)
        // console.log(user)
        res.send(user)
    } catch (error) {
        res.status(400).send()
    }
})


//PATCH
router.patch('/users/:id', async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','age','email','password']
    const valid = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if(!valid) return res.status(400).send();
     
    try {
        const updatedUser = await User.findById(req.params.id);
        updates.forEach((update) => updatedUser[update]=req.body[update])
        await updatedUser.save()
        //const updatedUser = await User.findByIdAndUpdate(req.params.id,req.body, {new: true, runValidators: true})
        if(!updatedUser) return res.status(404).send()
        res.send(updatedUser)
    } catch(error) { 
        res.status(400).send(error)
    }
})


//DELETE
router.delete('/users/:id', async (req,res) => {
    try{
        const delUser = await User.findByIdAndDelete(req.params.id)
        if(!delUser) return res.status(400).send()
        res.send(delUser)
    } catch(error) {
        res.status(500).send(error)
    }

})

module.exports = router