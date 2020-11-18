require('../src/db/mongoose')
const User = require('../src/models/user')
const Task = require('../src/models/task')
const { findByIdAndUpdate } = require('../src/models/user')

// User.findByIdAndUpdate("5fb42ddc899d021bb7744907", {age: 1})
//     .then((result) => {
//         return User.countDocuments({age:1})
//     })
//     .then((result) => {
//         console.log(result);
//     })
//     .catch((e) => {
//         console.log('Error!')
//     })

const setAgeAndCount =  async (_id, age) => {
    const user = await User.findByIdAndUpdate(_id,{age});
    const count = await User.countDocuments({age});
    return count;
}

setAgeAndCount("5fb42ddc899d021bb7744907", 2)
    .then((count) => console.log(count))
    .catch((error) => console.log(error));