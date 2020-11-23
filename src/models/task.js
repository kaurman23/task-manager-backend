const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    desc: {
        type:String,
        trim:true,
        required:true
    },
    completed: {
        type: Boolean,
        default: false
    },
    //owner will contain the ID only not the whole object of the user
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

// taskSchema.pre('save', async function(next) {
//     const task = this

//     console.log("Task middleware")

//     next()
// })


const Task = mongoose.model('Task', taskSchema)

module.exports = Task