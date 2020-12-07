const mongoose = require('mongoose')
const { default: validator } = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true, 
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
    },
    avatar: {
        type: Buffer
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
},{
    timestamps: true
})

userSchema.virtual('tasks',{  //this will create a tasks property on user which will contains all the tasks
    ref:'Task',
    localField:'_id', //will map the _id property of user to 
    foreignField:'owner' //owner field which contains the id of user (owner) 
})

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens 
    delete userObject.avatar

    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this

    const token = jwt.sign({_id: user._id.toString()}, 'iamwhoiam')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredential = async function (email,password) {
    
    const user = await User.findOne({email})

    if(!user) throw new Error('Unable to Login')

    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch) throw new Error('Unable to Login')

    //console.log("I am here"+isMatch+" "+user)
    return user
    
} 

userSchema.pre('save', async  function (next) {
    const user = this

    if(user.isModified('password'))
    {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
} )

userSchema.pre('remove', async function (next) {
    const user = this

    await Task.deleteMany({owner: user._id})

    next()
})

const User = mongoose.model('User',userSchema);

module.exports = User