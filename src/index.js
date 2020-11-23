const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express();
const port = process.env.port || 3000;


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port,() => {
    console.log('Server is up and running')
})

const main = async function (req,res) {
    // const task = await Task.findById("5fbb858cf945172a305d799f");
    // console.log(task.owner)

    // const user = await User.findById("5fbb7f4898ee8420624b6fb5")
    // await user.populate('tasks').execPopulate()
    // console.log(user.tasks)

}

main()
