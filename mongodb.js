const {MongoClient, ObjectID} = require('mongodb')
// const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27018'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL,{useNewUrlParser : true, useUnifiedTopology: true}, (error,client) => {
    if(error)
    {
        return console.log('Unable to connect to DataBase')
    } 
    console.log('Connected to the Database')

    const db = client.db(databaseName)


    //CREATE
    // db.collection('users').insertOne({
    //     name: 'Tanish',
    //     age: 22
    // })

    // db.collection('tasks').insertMany([{
    //     description: "Shop",
    //     completed: false
    // },
    // {
    //     description: "Bake",
    //     completed: false
    // },
    // {
    //     description: "Play",
    //     completed: false
    // }],(error,result) => {
    //     if(error){
    //         return console.log("Oops, there was an error")
    //     }
    //     console.log(result.ops);
    // })


    //READ
    // db.collection('users').findOne({name:'Tanish'},(error,result) => {
    //     if(error) return console.log("Oops, there was an error")
    //     console.log(result)
    // })

    // db.collection('tasks').find({completed:false}).toArray((error,task) => {
    //     if(error) return console.log("Oops, there was an error")
    //     console.log(task)
    // })

    // db.collection('tasks').find({completed:false}).count((error,task) => {
    //     if(error) return console.log("Oops, there was an error")
    //     console.log(task)
    // })

    const updatePromise = db.collection('tasks').updateOne({_id: new ObjectID("5fb2d78e11de5b2134ef9405")},{
        $set: {
            completed: true
        }
    })  //update one returns a promise

    updatePromise.then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(result)
    })
     
})    