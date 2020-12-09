const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { userOne, userOneID, setUpDatabase} = require('./fixtures/db')

beforeEach(setUpDatabase)

test('Should register user', async () => {
    const response = await request(app).post('/users').send({
        name:'Jinx',
        email:'x@y.com',
        password:'whatever123'
    }).expect(201)

    //assert that the database was change correctly
    const user = await User.findById(response.body.newUser._id)
    expect(user).not.toBeNull()

    //assertions about the response
    expect(response.body).toMatchObject({
        newUser: {
            name: "Jinx",
            email: "x@y.com"
        },
        token: user.tokens[0].token
    })
    //assert password
    expect(user.password).not.toBe("whatever123")
})

test('Should log in existing users', async () => {
    const response = await request(app).post('/users/login').send({
        name: "Mike",
        email: "monster@inc.com",
        password: "whatever123"
    }).expect(200)

    const user = await User.findById(userOneID)
    expect(response.body.token).toBe(user.tokens[1].token)

})

test('Should not log in non-existing user', async () => {
    await request(app).post('/users/login').send({
        name: "Mike",
        email: "monster@inc.com",
        password: "whatever"
    }).expect(400)
})

test('Should get user profile', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should get user profile without authentication', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(400)
})

test('Should delete user profile', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(userOneID)
    expect(user).toBeNull()
})

test('Should delete user profile without authentication', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(400)
})

test('Should upload a profile picture', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(201)

    const user = await User.findById(userOneID)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: "Manpreet"
        })
        .expect(200)
    
    const user = await User.findById(userOneID)
    expect(user.name).toBe("Manpreet")

})

test('Should not update invalid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: "Mars"
        })
        .expect(400)

})