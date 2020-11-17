const mongoose = require('mongoose');
const { default: validator } = require('validator');

mongoose.connect('mongodb://127.0.0.1:27018/task-manager-api',{ 
    useNewUrlParser: true, 
    useUnifiedTopology:true})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Please enter a valid email')
            }
        }
    },
    age: {
        type: Number,
        default:0,
        validate(value){
            if(value<0)
            {
                throw new Error("Age can't be number");
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value){
            if(value.includes('password'))
            {
                throw new Error("That's not a valid password")
            }
        }
    }
})
const User = mongoose.model('User',userSchema);

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

const taskSchema = new mongoose.Schema({
    desc: {
        type:String,
        trim:true,
        required:true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const Task = mongoose.model('Task', taskSchema);

const newTask = new Task({
})

newTask.save().then((result) => {
    console.log('Saved!')
}).catch((error) => {
    console.log('Error! : ' + error );
})