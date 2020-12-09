const app = require('./app')
const port = process.env.PORT


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port,() => {
    console.log('Server is up and running')
})

