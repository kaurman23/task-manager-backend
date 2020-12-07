const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const upload = multer({
    dest: 'images'
})

//GET
router.get('/users/me',auth, async (req,res) => {
    res.send(req.user)
    
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
        const token = await newUser.generateAuthToken()
        res.status(201).send({newUser, token})
    }
    catch(error)
    {
        res.status(400).send (error)
    }
})

router.post('/users/login', async (req,res) => {
    try {
        //checks if email and password and right and if right returns the user
        const user = await User.findByCredential(req.body.email,req.body.password)
        //generates jwt token to be used 
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch (error) { 
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req,res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token!==req.token
        })
        await req.user.save()

        res.send();
    } catch (error) {
        res.status(500).send();
    }
})

router.post('/users/logoutAll', auth, async (req,res) => {
    try{
        // console.log(req.user.tokens)
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch(error) {
        res.status(500).send()
    }
})


router.post('/users/me/avatar', upload.single('avatar'), (req,res) => {
    res.status(201).send()
})


//PATCH
router.patch('/users/me',auth, async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','age','email','password']
    const valid = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if(!valid) return res.status(400).send();
     
    try {
        updates.forEach((update) => req.user[update]=req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch(error) { 
        res.status(400).send(error)
    }
})


//DELETE
router.delete('/users/me', auth, async (req,res) => {
    try{
        await req.user.remove()
        res.send(req.user)
    } catch(error) {
        res.status(500).send(error)
    }

})

module.exports = router