require('../src/db/mongoose')
const User = require('../src/models/user')
const Task = require('../src/models/task')
const { findByIdAndDelete, countDocuments } = require('../src/models/user')

// Task.findByIdAndDelete("5fb3c246cc29602eb5a7072e")
//     .then((result) => {
//         return Task.countDocuments({completed: false})
//     })
//     .then((count) => {
//         console.log(count);
//     })
//     .catch((error) => {
//         console.log(error);
//     })

const deleteDocAndReturnCount = async (_id) => {
    const result1 = await Task.findByIdAndDelete(_id)
    const result2 = await Task.countDocuments({completed:false})
    return result2;
}

deleteDocAndReturnCount("5fb42fb631e2f11ed2c44760")
    .then((count => console.log(count)))
    .catch((error) => console.log(error))