const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

const userOneID = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneID,
    name: "Mike",
    email: "monster@inc.com",
    password: "whatever123",
    tokens: [{
        token: jwt.sign({_id: userOneID}, process.env.JWT_SECRET)
    }]
}

const userTwoID = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoID,
    name: "Pam",
    email: "dunder@mifflin.com",
    password: "whatever123",
    tokens: [{
        token: jwt.sign({_id: userTwoID}, process.env.JWT_SECRET)
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    desc: "First task",
    completed: false,
    owner: userOneID
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    desc: "Second task",
    completed: true,
    owner: userOneID
}

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    desc: "Third task",
    completed: true,
    owner: userTwoID
}



const setUpDatabase = async () => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

module.exports = {
    userOneID,
    userOne,
    setUpDatabase,
    userTwoID,
    userTwo,
    taskOne,
    taskTwo,
    taskThree
}