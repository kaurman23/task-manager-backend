const mongoose = require('mongoose');
const { default: validator } = require('validator');

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

module.exports = User