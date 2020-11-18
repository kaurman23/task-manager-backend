const mongoose = require('mongoose');
const { default: validator } = require('validator');

mongoose.connect('mongodb://127.0.0.1:27018/task-manager-api',{ 
    useNewUrlParser: true, 
    useUnifiedTopology:true})



// const me = new User({
//     name: 'Tanish',
//     email: 'tansihguleria@gmail.com',
//     age: 24,
//     password: "okay1234"
    
// })

// me.save().then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log('There seems to be an error: ',error)
// })

// const taskSchema = new mongoose.Schema({
//     desc: {
//         type:String,
//         trim:true,
//         required:true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     }
// })

// const Task = mongoose.model('Task', taskSchema);

// const newTask = new Task({
//     desc:'Watch Game of Thrones'
// })

// newTask.save().then((result) => {
//     console.log('Saved!')
// }).catch((error) => {
//     console.log('Error! : ' + error );
// })