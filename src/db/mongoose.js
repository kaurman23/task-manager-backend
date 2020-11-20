const mongoose = require('mongoose');
const { default: validator } = require('validator');

mongoose.connect('mongodb://127.0.0.1:27018/task-manager-api',{ 
    useNewUrlParser: true, 
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex: true,
    autoIndex: true
})

