const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const request = require('supertest')
const { response } = require('../src/app')
const app = require('../src/app')
const User = require('../src/models/user')

const userOneID = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneID,
    name: "Mike",
    email: "monster@inc.com",
    password: "whatever123",
    tokens: [{
        token: jwt.sign({_id: userOneID}, process.env.JWT_SECRET)
    }]
}

beforeEach( async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

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