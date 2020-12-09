const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const { userOne, 
        userOneID, 
        userTwo,
        userTwoID,
        taskOne,
        taskTwo,
        taskThree,
        setUpDatabase} = require('./fixtures/db')


beforeEach(setUpDatabase)

test('Should create task for a user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            desc: "From my test"
        })
        .expect(201)

        const task = await Task.findById(response.body._id)
     
        expect(task).not.toBeNull()
        expect(task.completed).toEqual(false)
})

test('Should get all tasks of a user', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    
    const len = response.body.length
    expect(len).toBe(2)

})

test("Should not delete other user's task", async () => {
    const response = await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(400)
    
    const task = Task.findById(taskOne._id)
    expect(task).not.toBeNull()
})